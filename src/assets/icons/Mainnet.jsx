import React from "react";
import SVGIconWrapper from "./SVGIconWrapper";

function SwitchLight(props) {
  return (
    <SVGIconWrapper width={19} height={18} {...props}>
      <g id="Frame">
        <path id="Vector" d="M0.220703 9C0.220703 4.02943 4.25014 0 9.2207 0C14.1912 0 18.2207 4.02943 18.2207 9C18.2207 13.9705 14.1912 18 9.2207 18C4.25014 18 0.220703 13.9705 0.220703 9Z" fill="#627EEA"/>
        <path id="Vector_2" d="M9.21973 3.46265V7.55647L12.6798 9.10258L9.21973 3.46265Z" fill="white" fillOpacity="0.602"/>
        <path id="Vector_3" d="M9.2194 3.46265L5.75879 9.10258L9.2194 7.55647V3.46265Z" fill="white"/>
        <path id="Vector_4" d="M9.21973 11.7554V14.5372L12.6822 9.74683L9.21973 11.7554Z" fill="white" fillOpacity="0.602"/>
        <path id="Vector_5" d="M9.2194 14.5372V11.755L5.75879 9.74683L9.2194 14.5372Z" fill="white"/>
        <path id="Vector_6" d="M9.21973 11.1116L12.6798 9.10249L9.21973 7.55725V11.1116Z" fill="white" fillOpacity="0.2"/>
        <path id="Vector_7" d="M5.75879 9.10249L9.2194 11.1116V7.55725L5.75879 9.10249Z" fill="white" fillOpacity="0.602"/>
      </g>
    </SVGIconWrapper>
  );
}

export default SwitchLight;