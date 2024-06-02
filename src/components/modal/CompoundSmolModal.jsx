import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import CaelumPaper from "../common/CaelumPaper"
import CaelumInput from "../common/CaelumInput"
import { toast } from 'react-toastify';
import { getContractResult, getErrorMessage, getFormattedDisplayNumber, parseNumber } from '../../utils/constants';
import { useAccount, useChainId, useContractReads, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { getBenkeiContract, getChefContract } from '../../contracts';

function CompoundSmolModal({open, pendingTx, ...props}) {
  if (!open || !props.data) return (<></>)

  const {address} = useAccount()
  const chainId = useChainId()

  const [actionName, setActionName] = useState("Stake")

  const data = props.data
  const [allowance, setAllowance] = useState(0)
  const [rewardAmount, setRewardAmoount] = useState(0)

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
        ...getChefContract(chainId),
        functionName: "pendingReward",
        args: [1, address],
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
    setRewardAmoount(getContractResult(contractResult[1]))
  }, [contractResult])

  const shouldApprove = () => {
    return parseFloat(allowance)<parseFloat(rewardAmount*1.5)
  }

  const handleAction = () => {
    try {
      if(shouldApprove()) {
        setApprovePendingTx(true)
        approve({
          args: [getChefContract(chainId).address, parseEther((rewardAmount * 2).toString())]
        })
        return
      }
      props.onAction()
    } catch (error) {
      console.error(error)
      setApprovePendingTx(false)
    }
  }

  useEffect(() => {
    setActionName(shouldApprove()?"Approve":"Compound")
  }, [rewardAmount, allowance])

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
        <div className="modal-content flex flex-col grow text-center">
          {actionName === "Approve"? `You need to approve ${getFormattedDisplayNumber(rewardAmount*2)} Robocopcoin tokens to compound.` : "You can compound now."}
        </div>
        <div className="modal-action grow">
          <button className="primary-btn" onClick={handleAction} disabled={parseFloat(rewardAmount) === 0 || pendingTx || approvePendingTx}>
            {(pendingTx||approvePendingTx)&&<div className="loader"></div>}
            {actionName}
          </button>
        </div>
      </CaelumPaper>
    </>
  )
}

export default CompoundSmolModal