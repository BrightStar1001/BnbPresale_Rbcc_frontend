import React from "react";
import SVGIconWrapper from "./SVGIconWrapper";

function ArrowDown(props) {
  return (
    <SVGIconWrapper width={11} height={7} {...props}>
      <path d="M0.59308 1.29296C0.780607 1.10549 1.03492 1.00017 1.30008 1.00017C1.56524 1.00017 1.81955 1.10549 2.00708 1.29296L5.30008 4.58596L8.59308 1.29296C8.68533 1.19745 8.79567 1.12127 8.91768 1.06886C9.03968 1.01645 9.1709 0.988862 9.30368 0.987709C9.43646 0.986555 9.56814 1.01186 9.69103 1.06214C9.81393 1.11242 9.92558 1.18667 10.0195 1.28056C10.1134 1.37446 10.1876 1.48611 10.2379 1.60901C10.2882 1.7319 10.3135 1.86358 10.3123 1.99636C10.3112 2.12914 10.2836 2.26036 10.2312 2.38236C10.1788 2.50437 10.1026 2.61471 10.0071 2.70696L6.00708 6.70696C5.81955 6.89443 5.56524 6.99975 5.30008 6.99975C5.03492 6.99975 4.78061 6.89443 4.59308 6.70696L0.59308 2.70696C0.405609 2.51943 0.300293 2.26512 0.300293 1.99996C0.300293 1.73479 0.405609 1.48049 0.59308 1.29296Z" fill={props.color}/>
    </SVGIconWrapper>
  );
}

export default ArrowDown;