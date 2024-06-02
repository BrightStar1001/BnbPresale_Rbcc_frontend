import { forwardRef, useRef } from "react"

const CaelumInput = forwardRef((props, ref) => {
  const handleChange = (e) => {
    let val = e.target.value
    if (props.checkmax && parseFloat(val) > parseFloat(props.max))
      ref.current.value = props.max
    else if (val < 0)
      ref.current.value = 0
    props.onChange && props.onChange(ref.current.value)
  }

  return (
    <input type="number" inputMode="decimal" className={props.className} placeholder={props.placeholder} onChange={handleChange} ref={ref}/>
  )
})

export default CaelumInput