import React from "react";

function SVGIconWrapper({ styles={}, width=0, height=0 , classes = "", viewBox = "", children }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="inherit"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      style={styles}
    >
      {children}
    </svg>
  );
}

export default SVGIconWrapper;
