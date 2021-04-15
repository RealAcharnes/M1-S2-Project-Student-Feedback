import React from 'react'

const Toggle = ({onChange}) => {
    return (
        <div>
            <input type="checkbox" onChange={onChange}></input>
        </div>
    )
}

export default Toggle
