import CaelumPaper from "../common/CaelumPaper"

function ConfirmModal({props}) {
  return (
    <>
      <div className="w-full h-full fixed backdrop-blur top-0" onClick={props.handleModalClose}></div>
      <CaelumPaper className="confirm-dialog"></CaelumPaper>
    </>
  )
}

export default ConfirmModal