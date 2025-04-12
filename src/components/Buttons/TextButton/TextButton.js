// Use for buttons that have just text in them,
// creates a button with the text inside of it
// accepts a classname as a prop to accept different
// bootstrap classes to color the button appropriately

import './TextButton.scss';
import React from 'react';

const TextButton = props => {

    const _btnClicked = () => {props.onclick();};

    return (
        <button
            className={props.className}
            onClick={_btnClicked}
            title={props.title}
            >
            {props.title}
        </button>
    );
};

export default TextButton;
