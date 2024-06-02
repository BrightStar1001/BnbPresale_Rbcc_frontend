import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import CaelumPaper from "../common/CaelumPaper"
import CaelumInput from "../common/CaelumInput"
import { toast } from 'react-toastify';
import { getContractResult, getErrorMessage, getFormattedDisplayNumber, parseNumber } from '../../utils/constants';
import { useAccount, useChainId, useContractReads, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { getBenkeiContract, getBenkeiEthLpContract, getChefContract } from '../../contracts';

function CompoundBigModal({open, pendingTx, ...props}) {
  if (!open || !props.data) return (<></>)

  const {address} = useAccount()
  const chainId = useChainId()

  const [inputValue, setInputValue] = useState("0")
  const [actionName, setActionName] = useState("Stake")

  const refAmount = useRef(null)

  const data = props.data
  const [allowance, setAllowance] = useState(0)
  const [allowanceLp, setAllowanceLp] = useState(0)
  const [lpTotalSupply, setLpTotalSupply] = useState(0)

  const [txHash, setTxHash] = useState(null)
  const [approvePendingTx, setApprovePendingTx] = useState(false)

  const {data: contractResult, refetch: refetchAllowance} = useContractReads({
    contracts: [
      {
        ...getBenkeiContract(chainId),
        functionName: "allowance",
        args: [address, getChefContract(chainId).address],
      },
      {
        ...getBenkeiEthLpContract(chainId),
        functionName: "allowance",
        args: [address, getChefContract(chainId).address],
      },
      {
        ...getBenkeiEthLpContract(chainId),
        functionName: "totalSupply",
        args: [],
      },
    ]
  })

  const {write: approve} = useContractWrite({
    ...getBenkeiContract(chainId),
    functionName: 'approve',
    onSuccess: (data) => {
      console.log("sniper: on success: ")
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
      setApprovePendingTx(true)
    },
    onError: (data) => {
      console.log("sniper: on error")
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setApprovePendingTx(false)
    },
  })

  const {write: approveLp} = useContractWrite({
    ...getBenkeiEthLpContract(chainId),
    functionName: 'approve',
    onSuccess: (data) => {
      console.log("sniper: on success: ")
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
      setApprovePendingTx(true)
    },
    onError: (data) => {
      console.log("sniper: on error")
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setApprovePendingTx(false)
    },
  })

  useWaitForTransaction({
    hash: txHash,
    onSuccess: (data) => {
      toast.success("Transaction Success!")
      setTxHash(null)
      setApprovePendingTx(false)
      console.log("refetch contracts...")
      refetchAllowance()
    },
  })

  useEffect(() => {
    if(!contractResult) return
    console.log("sniper: contract result1: ", contractResult)
    setAllowance(getContractResult(contractResult[0]))
    setAllowanceLp(getContractResult(contractResult[1]))
    setLpTotalSupply(getContractResult(contractResult[2]))
  }, [contractResult])

  const shouldApprove = () => {
    return parseFloat(allowance)<parseFloat(inputValue*data.benkeiRateForEth*1.5)
  }

  const shouldApproveLp = () => {
    console.log("sniper: contract result1: ", parseFloat(allowanceLp), parseFloat(lpTotalSupply))
    return parseFloat(allowanceLp)<parseFloat(lpTotalSupply)
  }

  const handleAction = async () => {
    try {
      if(shouldApprove()) {
        setApprovePendingTx(true)
        approve({
          args: [getChefContract(chainId).address, parseEther((inputValue*data.benkeiRateForEth*2).toString())]
        })
        return
      }
      if(shouldApproveLp()) {
        setApprovePendingTx(true)
        await approveLp({
          args: [getChefContract(chainId).address, parseEther(lpTotalSupply.toString())]
        })
        refetchAllowance()
        return
      }
      props.onAction(refAmount.current.value, inputValue*data.benkeiRateForEth)
    } catch (error) {
      console.error(error)
      setApprovePendingTx(false)
    }
  }

  const handleMax = () => {
    refAmount.current.value = data.max
    setInputValue(parseNumber(data.max))
  }

  useEffect(() => {
    setActionName(shouldApprove()?"Approve Robocopcoin" : shouldApproveLp()? "Approve Lp":"Compound")
  }, [data, inputValue, allowance, allowanceLp])

  return (
    <>
      <div className="w-full h-full fixed backdrop-blur top-0" onClick={props.onClose}></div>
      <CaelumPaper className="staking-modal flex flex-col">
        <button className="btn-close fixed top-10 right-10" onClick={props.onClose}>
          <CloseIcon className="btn-close"/>
        </button>
        <div className="modal-title grow">
          {data.title}
        </div>
        <div className="modal-content flex flex-col grow">
          <div className="flex">
            <div className="grow">{data.action}</div>
            <div className="flex gap:10">
              <span className="max-value">Max: {getFormattedDisplayNumber(data.max)}</span>
              <span className="btn-max" onClick={handleMax}>MAX</span>
            </div>
          </div>
          <div className="flex items-center">
            <CaelumInput checkmax={true} max={data.max} placeholder="0.00" ref={refAmount} onChange={() => setInputValue(refAmount.current.value?refAmount.current.value:"0")} />
            <span className="w-max">{data.token}</span>
          </div>
        </div>
        {actionName==="Approve Robocopcoin" && <p className='w-full text-center'>{`You need to approve ${getFormattedDisplayNumber(inputValue*data.benkeiRateForEth*2)} Robocopcoin to compound`}</p>}
        {actionName==="Approve Lp" && <p className='w-full text-center'>{`You need to approve ${getFormattedDisplayNumber(lpTotalSupply)} Lp to compound`}</p>}
        <div className="modal-action grow">
          <button className="primary-btn" onClick={handleAction} disabled={parseFloat(inputValue) === 0 || pendingTx || approvePendingTx}>
            {(pendingTx||approvePendingTx)&&<div className="loader"></div>}
            {actionName}
          </button>
        </div>
      </CaelumPaper>
    </>
  )
}

export default CompoundBigModal