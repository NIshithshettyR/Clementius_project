import React from 'react'

function Buttons(props) {
    return (
        <div>
            <button 
                onClick ={props.click}
                type={props.type}
                value={props.value}
                className ={props.class}
            >{props.buttonname}</button>
        </div>
    )
}

export default Buttons;
