// Use for buttons that have icons in them,
// creates a square button with the icon inside of it
// accepts a classname as a prop to accept different
// bootstrap classes to color the button appropriately

import './IconButton.scss'
import React from 'react'

const IconButton = props => {
    const _buttonClicked = () => {props.onClick();}

    return(
        <div className="Button">
            <button type="button" 
                    className={props.btnClass}
                    title={props.btnTitle}
                    onClick={_buttonClicked}>
                <img 
                    src={props.btnSrc} 
                    alt={props.btnTitle} 
                    
                    style={{ width: '20px', height: '20px' }} 
                />
            </button>
        </div>
    );
}

export default IconButton;