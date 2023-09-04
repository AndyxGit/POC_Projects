import Icon from '@mdi/react';
import React from 'react';
import './Card.css'


export const Card = ({ title, name, icon, onClick, tabIndex }) => {

    const enterCard = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            onClick();
        }
    }

    return (
        <div onClick={() => onClick()} title={title} className='card' aria-label={title} tabIndex={tabIndex} onKeyDown={(e) => enterCard(e)}>
            <Icon path={icon} size={'30px'} />
            <div className='titleCard'>{name}</div>
        </div>
    )
}

