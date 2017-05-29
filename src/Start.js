import React from "react";

const Start = (props)=>{
    return(
        <div className="wrapper">
            <button id="start" onClick={props.onClick}>{props.text}</button>
            <button id="clear" onClick={props.clear}>Clear</button>
        </div>
    );
};

export default Start;