import React from 'react';
import './Modal.css'

export const Modal = ({ icon, message, deniedButtonText, confirmButtonText, onDeniedClick, onConfirmClick }) => (
    <div className='modalContainer'>
        <div className='modal'>
            <div className='modalRowContainer'>
                <img className='modalIcon' src={icon} width={30} height={30}/>
                <div className='modalMessage'> {message} </div>
            </div>
            
            <div className='modalRowContainer'>
                <div className='deniedModalButton' onClick={onDeniedClick}> {deniedButtonText} </div>
                <div className='confirmModalButton' onClick={onConfirmClick}> {confirmButtonText} </div>
            </div>
        </div>
    </div>
)