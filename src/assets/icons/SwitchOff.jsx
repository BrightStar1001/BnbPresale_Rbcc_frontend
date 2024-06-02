import React from "react";
import SVGIconWrapper from "./SVGIconWrapper";

function SwitchOff(props) {
  return (
    <SVGIconWrapper width={20} height={20} {...props}>
      <g clipPath="url(#clip0_20_696)">
        <path d="M18 10.7207C17.8599 12.237 17.2908 13.682 16.3594 14.8866C15.428 16.0914 14.1728 17.0059 12.7405 17.5231C11.3084 18.0405 9.75851 18.1393 8.27226 17.8078C6.78601 17.4764 5.42487 16.7286 4.34813 15.6519C3.27138 14.5751 2.52356 13.214 2.19216 11.7277C1.86077 10.2415 1.95949 8.6916 2.47682 7.25941C2.99413 5.82724 3.90862 4.572 5.11329 3.64059C6.31797 2.70918 7.76299 2.14012 9.27928 2C8.39154 3.201 7.96436 4.68075 8.07542 6.1701C8.18648 7.65945 8.82842 9.05946 9.88448 10.1155C10.9405 11.1716 12.3405 11.8135 13.8299 11.9246C15.3193 12.0356 16.799 11.6084 18 10.7207Z" stroke={props.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={"transparent"}/>
      </g>
      <defs>
        <clipPath id="clip0_20_696">
          <rect width="20" height="20" fill={props.color}/>
        </clipPath>
      </defs>
    </SVGIconWrapper>
  );
}

export default SwitchOff;