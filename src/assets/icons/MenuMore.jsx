import React from "react";
import SVGIconWrapper from "./SVGIconWrapper";

function MenuMore(props) {
  return (
    <SVGIconWrapper width={24} height={24} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill={props.color}></path>
    </SVGIconWrapper>
  );
}

export default MenuMore;