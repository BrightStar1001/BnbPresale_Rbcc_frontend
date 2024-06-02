import CaelumPaper from "./common/CaelumPaper";
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import DepositModal from "./modal/DepositModal";
import { useEffect, useState } from "react";
import { getBenkeiContract, getChefContract } from "../contracts";
import WithdrawModal from "./modal/WithdrawModal";
import { useAccount, useChainId, useContractReads, useContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { calculateAPR, getContractResult, getErrorMessage, getFormattedDisplayNumber } from "../utils/constants";
import { formatEther, formatUnits, parseEther } from "viem";
import useMarketState from "../hooks/useMarketState";
import CompoundSmolModal from "./modal/CompoundSmolModal";

function SmolProtect (props) {
  const {address} = useAccount()
  const chainId = useChainId()

  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [depositModalData, setDepositModalData] = useState(
    {token: "Robocopcoin", title: "Smol Protect", action: "Deposit", actionTitle: "Deposit", 
    tokenContract: null, spenderAddress: null, max: 0}
  )

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [withdrawModalData, setWithdrawModalData] = useState(
    {token: "Robocopcoin", title: "Smol Protect", action: "Withdraw", actionTitle: "Withdraw", max: 0}
  )

  const [compoundModalOpen, setCompoundModalOpen] = useState(false)
  const [compoundModalData, setCompoundModalData] = useState(
    {token: "Robocopcoin", title: "Smol Compound", action: "Compound", actionTitle: "Compound", max: 0}
  )

  const [pendingTx, setPendingTx] = useState(false)
  const [txHash, setTxHash] = useState(null)

  const [tokenBalance, setTokenBalance] = useState(0)
  const [protectedBalance, setProtectedBalance] = useState(0)
  const [rewardDebt, setRewardDebt] = useState(0)
  const [lockEndedTimeStamp, setLockEndedTimeStamp] = useState(0)
  const [pendingRewards, setPendingRewards] = useState(0)
  const [rewardPerBlock, setRewardPerBlock] = useState(0)

  const [depositsEnabled, setDepositsEnabled] = useState(false)
  const [lockDuration, setLockDuration] = useState(false)
  const [scalingFactor, setScalingFactor] = useState(0)

  const {smolProtectTvl, benkeiBalanceInChef} = useMarketState()

  const {data: contractResult, refetch: refetchContracts} = useContractReads({
    contracts: [
      {
        ...getBenkeiContract(chainId),
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...getChefContract(chainId),
        functionName: "pendingReward",
        args: [1, address],
      },
      {
        ...getChefContract(chainId),
        functionName: "lockDurations",
        args: [1],
      },
      {
        ...getChefContract(chainId),
        functionName: "userInfo",
        args: [1, address],
      },
      {
        ...getChefContract(chainId),
        functionName: "poolInfo",
        args: [1],
      },
      {
        ...getBenkeiContract(chainId),
        functionName: "benkeisScalingFactor",
        args: [],
      },
      {
        ...getChefContract(chainId),
        functionName: "rewardPerBlock",
        args: [],
      },
    ]
  })
  
  useEffect(() => {
    if(!contractResult) return
    console.log("sniper: contract result: ", contractResult, getContractResult(contractResult[1], 0))
    setTokenBalance(getContractResult(contractResult[0]))
    setPendingRewards(getContractResult(contractResult[1]))
    setLockDuration(getContractResult(contractResult[2], 0))
    if(contractResult[3].status === 'success') {
      setProtectedBalance(formatEther(contractResult[3].result[0]))
      setRewardDebt(formatEther(contractResult[3].result[1]))
      setLockEndedTimeStamp(formatUnits(contractResult[3].result[2], 0))
    }
    setScalingFactor(getContractResult(contractResult[5]))
    setRewardPerBlock(getContractResult(contractResult[6]))
    // setLockEndedTimeStamp(formatUnits(contractResult[4].result[1], 0))
  }, [contractResult])

  const {write: deposit} = useContractWrite({
    ...getChefContract(chainId),
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
    ...getChefContract(chainId),
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

  const {write: claim} = useContractWrite({
    ...getChefContract(chainId),
    functionName: 'claim',
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

  const {write: compound} = useContractWrite({
    ...getChefContract(chainId),
    functionName: 'compoundSmol',
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
      setCompoundModalOpen(false)
      console.log("refetch contracts...")
      refetchContracts()
    }
  })


  const handleDeposit = () => {
    let _modalData = depositModalData;
    _modalData.tokenContract = getBenkeiContract(chainId)
    _modalData.spenderAddress = getChefContract(chainId).address
    _modalData.max = tokenBalance
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

  const handleCompound = () => { 
    let _modalData = compoundModalData;
    const _now = Date.now() / 1000
    _modalData.max = pendingRewards
    setCompoundModalData(_modalData)
    setCompoundModalOpen(true)
  }

  const processCompound = async () => {   
    try {
      setPendingTx(true)
      compound({
        args: []
      })
    } catch (error) {
      console.error(error)
      setPendingTx(false)
    }
  }

  const processDeposit = async (value) => {
    console.log("sniper: process deposit: ", value)
    try {
      setPendingTx(true)
      deposit({
        args: [1, parseEther(value), address]
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
        args: [1, parseEther(value)]
      })
    } catch (error) {
      console.error(error)
      setPendingTx(false)
    }

  }

  const handleClaim = () => {
    try {
      setPendingTx(true)
      claim({
        args: [1, address]
      })
    } catch (error) {
      console.error(error)
      setPendingTx(false)
    }
  }
  
  return (
    <>
      <CaelumPaper className="staking-lp mx-auto mb-10 w-full md:w-[50%]">
        <div className="title">Smol Protect</div>
        <a href="https://app.uniswap.org/" target="_blank" className="address">
          <span>Get Robocopcoin here</span>
          <ArrowOutward/>
        </a>
        <div className="pool-info flex">
          <div className="labels flex grow flex-col">
            <span>APR</span>
            <span>TVL</span>
            <span>Lock Duration</span>
          </div>
          <div className="values flex flex-col">
            <span>{getFormattedDisplayNumber(calculateAPR(benkeiBalanceInChef, rewardPerBlock * 100 / 1000, 365*24*60*60/3))}%</span>
            <span>${getFormattedDisplayNumber(smolProtectTvl)}</span>
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
            <span>{getFormattedDisplayNumber(tokenBalance)}</span>
            <span>{getFormattedDisplayNumber(protectedBalance * scalingFactor / 1000000)}</span>
            {protectedBalance>0 && <span>{`${new Date(lockEndedTimeStamp * 1000).toLocaleDateString()} ${new Date(lockEndedTimeStamp * 1000).toLocaleTimeString()}`}</span>}
          </div>
        </div>
        
        <div className="reward-info flex flex-col">
          <div className="flex">
            <div className="grow">Rewards</div>
            <div>{getFormattedDisplayNumber(pendingRewards)}</div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex items-center justify-center md:justify-between mt-5 mx-3 gap-2">
          <button className="primary-btn" onClick={handleDeposit}>Deposit</button>
          <button className="primary-btn" onClick={handleWithdraw}>Withdraw</button>
          <button className="primary-btn" onClick={handleCompound}>Compound</button>
          <button className="primary-btn" onClick={handleClaim}>Claim</button>
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
        
      <CompoundSmolModal 
        open={compoundModalOpen}
        data={compoundModalData}
        onAction={processCompound}
        pendingTx={pendingTx}
        onClose={() => (setCompoundModalOpen(false))}/>
    </>
  )
}

export default SmolProtect; 