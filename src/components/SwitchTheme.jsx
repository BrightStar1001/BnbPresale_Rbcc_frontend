import { useAuthState } from "../context/AuthContext";

import SwitchOn from "../assets/icons/SwitchOn"
import SwitchOff from "../assets/icons/SwitchOff"

function SwitchTheme() {
  const { authState, updateTheme } = useAuthState();

  const handleClick = () => {
    updateTheme()
  }

  return (
    <button className="btn-switch-theme flex" onClick={handleClick}>
      {authState.preferDark ? (
        <>
          <span className="btn-light"><SwitchOn color={"white"}/></span>
          <span className="btn-dark active"><SwitchOff color={"white"}/></span>
        </>
      ):( 
        <>
          <span className="btn-light active"><SwitchOn color={"#515151"}/></span>
          <span className="btn-dark"><SwitchOff color={"#515151"}/></span>
        </>
      )}
    </button>
  )
}

export default SwitchTheme;