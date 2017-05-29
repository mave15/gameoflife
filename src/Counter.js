import React from "react";

const Counter = (props)=>{
    return(
        <div>
            <div className="spacer"></div>
            <p className="text">Generations:{props.counter}</p>
            <div className="spacer"></div>
        </div>
    );
};

export default Counter;