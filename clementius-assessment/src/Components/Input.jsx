import React from 'react'

function Input(props) {
    return (
        <div>
            <input
            id={props.id}
            onChange={props.change}
            type={props.type}
            className={props.class}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            autoFocus={props.auto}
            autoComplete={props.complete}
            ></input>  
        </div>
    )
}

export default Input;
