import React from "react";
import SVGIconWrapper from "./SVGIconWrapper";

function WbtIcon(props) {
  return (
    <SVGIconWrapper width={23} height={36} {...props}>
      <path d="M11.3316 0L11.084 0.82041V24.6243L11.3316 24.8653L22.6599 18.334L11.3316 0Z" fill="#7F99EA"/>
      <path d="M11.3286 0L0 18.334L11.3286 24.8653V13.3115V0Z" fill="#AABDFE"/>
      <path d="M11.331 26.9571L11.1914 27.1231V35.6025L11.331 36L22.6662 20.4292L11.331 26.9571Z" fill="#4867C0"/>
      <path d="M11.3286 36V26.9571L0 20.4292L11.3286 36Z" fill="#6483DA"/>
      <path d="M11.3271 24.8649L22.6555 18.3336L11.3271 13.3112V24.8649Z" fill="#4E6FCE"/>
      <path d="M0 18.3336L11.3286 24.8649V13.3112L0 18.3336Z" fill="#6685DC"/>
    </SVGIconWrapper>
  );
}

export default WbtIcon;