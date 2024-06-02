import React from "react";
import SVGIconWrapper from "./SVGIconWrapper";

function AddIcon(props) {
  return (
    <SVGIconWrapper width={10} height={10} {...props}>
      <path d="M5 1V9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 5H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SVGIconWrapper>
  );
}

export default AddIcon;