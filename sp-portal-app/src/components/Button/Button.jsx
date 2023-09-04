import React from 'react'
import './Button.css'

export const Button = ({tabIndex, title, disabled, text, onButtonClick }) => {
    return (
        <div>
            <button title={title} tabIndex={tabIndex} className={disabled ? 'disabledButton' : 'activeButton'} disabled={disabled} onClick={() => onButtonClick()}>
                {text}
            </button>
        </div>
    );
}
