import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import CaelumPaper from "../common/CaelumPaper"
import CaelumInput from "../common/CaelumInput"
import { toast } from 'react-toastify';
import { getContractResult, getFormattedDisplayNumber, parseNumber } from '../../utils/constants';
import { useAccount, useChainId, useContractReads, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { getBenkeiContract, getBenkeiEthLpContract, getProtectContract, getChefContract } from '../../contracts';

function StakingModal({open, pendingTx, ...props}) {
  if (!open || !props.data) return (<></>)

  const {address} = useAccount()
  const chainId = useChainId()

  const [inputValue, setInputValue] = useState("0")
  const [actionName, setActionName] = useState("Stake")

  const refAmount = useRef(null)

  const data = props.data
  const [allowance1, setAllowance1] = useState(0)
  const [allowance2, setAllowance2] = useState(0)

  const [txHash, setTxHash] = useState(null)
  const [approvePendingTx, setApprovePendingTx] = useState(false)

  const {data: contractResult, refetch: refetchAllowance} = useContractReads({
    contracts: [
      {
        ...getBenkeiContract(chainId),
        functionName: "allowance",
        args: [address, getProtectContract(chainId).address],
      },
      {
        ...getBenkeiEthLpContract(chainId),
        functionName: "allowance",
        args: [address, getChefContract(chainId).address],
      },
    ]
  })
  const {write: approve1} = useContractWrite({
    ...getBenkeiContract(chainId),
    functionName: 'approve',
    onSuccess: (data) => {
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
      setApprovePendingTx(true)
    },
    onError: (data) => {
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setApprovePendingTx(false)
    }
  })

  const {write: approve2} = useContractWrite({
    ...getBenkeiEthLpContract(chainId),
    functionName: 'approve',
    onSuccess: (data) => {
      toast.success("Transaction Submitted!")
      setTxHash(data.hash)
      setApprovePendingTx(true)
    },
    onError: (data) => {
      toast.error(getErrorMessage(data))
      setTxHash(null)
      setApprovePendingTx(false)
    }
  })

  useWaitForTransaction({
    hash: txHash,
    onSuccess: (data) => {
      toast.success("Transaction Success!")
      setTxHash(null)
      setApprovePendingTx(false)
      console.log("refetch contracts...")
      refetchAllowance()
    }
  })

  useEffect(() => {
    if(!contractResult) return
    setAllowance1(getContractResult(contractResult[0]))
    setAllowance2(getContractResult(contractResult[1]))
  }, [contractResult])

  const shouldApprove = () => {
    if(data.type==1) {
      return parseFloat(allowance1)<parseFloat(inputValue)
    } else if(data.type==3) {
      return parseFloat(allowance2)<parseFloat(inputValue)
    } else return false
  }

  const handleAction = () => {
    try {
      if(shouldApprove()) {
        setApprovePendingTx(true)
        if(data.type==1) {
          approve1({
            args: [getProtectContract(chainId).address, parseEther(inputValue.toString())]
          })
        } else {
          approve2({
            args: [getChefContract(chainId).address, parseEther(inputValue.toString())]
          })
        }
        return
      }
      props.onAction(data.type, refAmount.current.value)
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
    if(data.type==1 || data.type==3) {
      setActionName(shouldApprove()?"Approve":data.actionTitle)
    } else {
      setActionName(data.actionTitle)
    }
  }, [data, inputValue, allowance1, allowance2])

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

export default StakingModal