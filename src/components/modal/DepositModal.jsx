import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import CaelumPaper from "../common/CaelumPaper"
import CaelumInput from "../common/CaelumInput"
import { toast } from 'react-toastify';
import { getContractResult, getErrorMessage, getFormattedDisplayNumber, parseNumber } from '../../utils/constants';
import { useAccount, useChainId, useContractReads, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';

function DepositModal({open, pendingTx, ...props}) {
  if (!open || !props.data) return (<></>)

  const {address} = useAccount()
  const chainId = useChainId()

  const [inputValue, setInputValue] = useState("0")
  const [actionName, setActionName] = useState("Stake")

  const refAmount = useRef(null)

  const data = props.data
  const [allowance, setAllowance] = useState(0)

  const [txHash, setTxHash] = useState(null)
  const [approvePendingTx, setApprovePendingTx] = useState(false)

  const {data: contractResult, refetch: refetchAllowance} = useContractReads({
    contracts: [
      {
        ...data.tokenContract,
        functionName: "allowance",
        args: [address, data.spenderAddress],
      },
    ]
  })

  const {write: approve} = useContractWrite({
    ...data.tokenContract,
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
  }, [contractResult])

  const shouldApprove = () => {
    return parseFloat(allowance)<parseFloat(inputValue)
  }

  const handleAction = () => {
    try {
      if(shouldApprove()) {
        setApprovePendingTx(true)
        approve({
          args: [data.spenderAddress, parseEther(inputValue.toString())]
        })
        return
      }
      props.onAction(refAmount.current.value)
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
    setActionName(shouldApprove()?"Approve":data.actionTitle)
  }, [data, inputValue, allowance])

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

export default DepositModal