import React from "react";
import SVGIconWrapper from "./SVGIconWrapper";

function SwitchOn(props) {
  return (
    <SVGIconWrapper width={20} height={20} {...props}>
      <g clipPath="url(#clip0_1_457)">
        <path d="M9.99985 13.7037C12.0453 13.7037 13.7036 12.0455 13.7036 9.99996C13.7036 7.95446 12.0453 6.29626 9.99985 6.29626C7.95435 6.29626 6.29614 7.95446 6.29614 9.99996C6.29614 12.0455 7.95435 13.7037 9.99985 13.7037Z" stroke={props.color}  fill={"transparent"} strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 1.85193V3.33341" stroke={props.color} strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 16.6666V18.1481" stroke={props.color} strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.23712 4.23706L5.28897 5.28892" stroke={props.color} strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.7111 14.7111L15.7629 15.7629" stroke={props.color} strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.85168 10H3.33317" stroke={props.color} strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.6667 10H18.1481" stroke={props.color} strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.23712 15.7629L5.28897 14.7111" stroke={props.color} strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.7111 5.28892L15.7629 4.23706" stroke={props.color} strokeWidth="2.22222" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_1_457">
          <rect width="20" height="20" fill={props.color}/>
        </clipPath>
      </defs>
    </SVGIconWrapper>
  ); 
}

export default SwitchOn;