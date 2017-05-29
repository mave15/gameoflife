import React from "react";

const SpeedButtons = (props)=>{
  return(
      <div className="wrapper">
          <button id="slower" onClick={props.onClick}>Slower</button>
          <button id="faster" onClick={props.onClick}>Faster</button>
      </div>
  );
};

export default SpeedButtons;