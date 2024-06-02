import CaelumPaper from "../components/common/CaelumPaper";
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import DepositModal from "./modal/DepositModal";
import { useEffect, useState } from "react";
import { getBenkeiContract, getProtectContract } from "../contracts";
import WithdrawModal from "./modal/WithdrawModal";
import { useAccount, useChainId, useContractReads, useContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { getContractResult, getErrorMessage, getFormattedDisplayNumber } from "../utils/constants";
import { formatEther, formatUnits, parseEther } from "viem";
import useMarketState from "../hooks/useMarketState";

function FullProtect (props) {
  const {address} = useAccount()
  const chainId = useChainId()

  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [depositModalData, setDepositModalData] = useState(
    {token: "Robocopcoin", title: "Full Protect", action: "Deposit", actionTitle: "Protect Robocopcoin", 
    tokenContract: null, spenderAddress: null, max: 0}
  )

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [withdrawModalData, setWithdrawModalData] = useState(
    {token: "Robocopcoin", title: "Full Protect", action: "Withdraw", actionTitle: "Withdraw Robocopcoin", max: 0}
  )

  const [pendingTx, setPendingTx] = useState(false)
  const [txHash, setTxHash] = useState(null)
  const [BenkeiBalance, setBenkeiBalance] = useState(0)
  const [protectedBalance, setProtectedBalance] = useState(0)
  const [lockEndedTimeStamp, setLockEndedTimeStamp] = useState(0)
  const [depositsEnabled, setDepositsEnabled] = useState(false)
  const [lockDuration, setLockDuration] = useState(false)

  const {fullProtectTvl} = useMarketState()

  const {data: contractResult, refetch: refetchContracts} = useContractReads({
    contracts: [
      {
        ...getBenkeiContract(chainId),
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...getProtectContract(chainId),
        functionName: "depositsEnabled",
        args: [],
      },
      {
        ...getProtectContract(chainId),
        functionName: "lockDuration",
        args: [],
      },
      {
        ...getProtectContract(chainId),
        functionName: "userInfo",
        args: [address],
      },
    ]
  })
  
  useEffect(() => {
    if(!contractResult) return
    console.log("sniper: contract result: ", contractResult, getContractResult(contractResult[1], 0))
    setBenkeiBalance(getContractResult(contractResult[0]))
    setDepositsEnabled(contractResult[1].result)
    setLockDuration(getContractResult(contractResult[2], 0))
    if(contractResult[3].status === 'success') {
      setProtectedBalance(formatEther(contractResult[3].result[0]))
      setLockEndedTimeStamp(formatUnits(contractResult[3].result[1], 0))
    }
  }, [contractResult])

  const {write: deposit} = useContractWrite({
    ...getProtectContract(chainId),
    functionName: 'deposit',
    onSuccess: (data) => {
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
      setPendingTx(true)
    },
    onError: (data) => {
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setPendingTx(false)
    }
  })

  const {write: withdraw} = useContractWrite({
    ...getProtectContract(chainId),
    functionName: 'withdraw',
    onSuccess: (data) => {
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
      setPendingTx(true)
    },
    onError: (data) => {
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setPendingTx(false)
    }
  })

  useWaitForTransaction({
    hash: txHash,
    onSuccess: (data) => {
      toast.success("Transaction Success!")
      setTxHash(null)
      setPendingTx(false)
      setDepositModalOpen(false)
      setWithdrawModalOpen(false)
      console.log("refetch contracts...")
      refetchContracts()
    }
  })


  const handleDeposit = () => {
    let _modalData = depositModalData;
    _modalData.tokenContract = getBenkeiContract(chainId)
    _modalData.spenderAddress = getProtectContract(chainId).address
    _modalData.max = BenkeiBalance
    setDepositModalData(_modalData)
    setDepositModalOpen(true)
  }

  const handleWithdraw = () => {
    let _modalData = withdrawModalData;
    const _now = Date.now() / 1000
    _modalData.max = lockEndedTimeStamp > _now? 0: protectedBalance
    setWithdrawModalData(_modalData)
    setWithdrawModalOpen(true)
  }

  const processDeposit = async (value) => {
    console.log("sniper: process deposit: ", value)
    try {
      setPendingTx(true)
      deposit({
        args: [parseEther(value)]
      })
    } catch (error) {
      console.error(error)
      setPendingTx(false)
    }
  }

  const processWithdraw = async (value) => {
    console.log("sniper: process withdraw: ", value)
    try {
      setPendingTx(true)
      withdraw({
        args: [parseEther(value)]
      })
    } catch (error) {
      console.error(error)
      setPendingTx(false)
    }

  }

  return (
    <>
      <CaelumPaper className="staking-lp mx-auto mb-10 w-full md:w-[50%]">
        <div className="title">Full Protect</div>
        <a href="https://app.uniswap.org/" target="_blank" className="address">
          <span>Get Robocopcoin here</span>
          <ArrowOutward/>
        </a>
        <div className="pool-info flex">
          <div className="labels flex grow flex-col">
            {/* <span>APR</span> */}
            <span>TVL</span>
            <span>Lock Duration</span>
          </div>
          <div className="values flex flex-col">
            {/* <span>{getFormattedDisplayNumber(0)}%</span> */}
            <span>${getFormattedDisplayNumber(fullProtectTvl)}</span>
            <span>{getFormattedDisplayNumber(lockDuration)} Seconds</span>
          </div>
        </div>
        
        <div className="divider"></div>
        <div className="pool-info flex">
          <div className="labels flex grow flex-col">
            <span>Robocopcoin Balance</span>
            <span>Protected Robocopcoin Balance</span>
            {protectedBalance>0 && <span>Unlock time</span>}
          </div>
          <div className="values flex flex-col">
            <span>{getFormattedDisplayNumber(BenkeiBalance)}</span>
            <span>{getFormattedDisplayNumber(protectedBalance)}</span>
            {protectedBalance>0 && <span>{`${new Date(lockEndedTimeStamp * 1000).toLocaleDateString()} ${new Date(lockEndedTimeStamp * 1000).toLocaleTimeString()}`}</span>}
          </div>
        </div>
        
        {/* <div className="reward-info flex flex-col">
          <div className="flex">
            <div className="grow">Boost</div>
            <div>None</div>
          </div>
          <div className="flex">
            <div className="grow">Rewards</div>
            <div>{getFormattedDisplayNumber(rewards1)} veCAL</div>
          </div>
        </div> */}
        <div className="divider"></div>
        <div className="buttons flex mt-5 mx-10 gap-2">
          <button className="primary-btn" onClick={handleDeposit}>Deposit</button>
          <button className="primary-btn" onClick={handleWithdraw}>Withdraw</button>
        </div>
      </CaelumPaper>
      
      <DepositModal 
        open={depositModalOpen}
        data={depositModalData}
        onAction={processDeposit}
        pendingTx={pendingTx}
        onClose={() => (setDepositModalOpen(false))}/>

      <WithdrawModal 
        open={withdrawModalOpen}
        data={withdrawModalData}
        onAction={processWithdraw}
        pendingTx={pendingTx}
        onClose={() => (setWithdrawModalOpen(false))}/>
    </>
  )
}

export default FullProtect; 