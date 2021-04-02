import React from 'react'

function Textarea(props) {
    return (
        <div>
            <textarea 
                onChange={props.change}
                name={props.name}
                className={props.class}
                rows={props.rows} 
                cols={props.columns} 
                placeholder={props.placeholder} 
                required={props.require}
            ></textarea>
        </div>
    )
}

export default Textarea;
