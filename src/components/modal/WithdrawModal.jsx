import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from 'react';
import CaelumPaper from "../common/CaelumPaper"
import CaelumInput from "../common/CaelumInput"
import { getFormattedDisplayNumber, parseNumber } from '../../utils/constants';

function WithdrawModal({open, pendingTx, ...props}) {
  if (!open || !props.data) return (<></>)

  const [inputValue, setInputValue] = useState("0")

  const refAmount = useRef(null)

  const data = props.data
  
  const handleAction = () => {
    try {
      props.onAction(refAmount.current.value)
    } catch (error) {
      console.error(error)
    }
  }

  const handleMax = () => {
    refAmount.current.value = data.max
    setInputValue(parseNumber(data.max))
  }

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
          <button className="primary-btn" onClick={handleAction} disabled={parseFloat(inputValue) === 0}>
            {(pendingTx)&&<div className="loader"></div>}
            Withdraw
          </button>
        </div>
      </CaelumPaper>
    </>
  )
}

export default WithdrawModal