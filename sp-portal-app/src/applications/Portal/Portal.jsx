import './Portal.css'
import React, { useContext } from 'react'
import { Text, Card } from '../../components'
import { mdiReceiptTextCheck } from '@mdi/js';
import { AppContext } from 'Context';
import AccordionComponent from 'applications/LineData/container/Accordion';


const CARDS = [
    {
        name: 'Consumo de Datos',
        title: 'Tarjeta Consumo de Datos',
        icon: mdiReceiptTextCheck,
    },

];

const Portal = () => {
    const { setLocation } = useContext(AppContext);

    return (
        <div>
             <AccordionComponent />
            <div className='cardsContainer'>
                <Text text='Aplicaciones disponibles' />
                <div className='hr' />
                <div className="three">
                    {
                        CARDS.map((card) => {
                            return (
                                <Card tabIndex={0} name={card.name} title={card.title} key={card.title} {...card} onClick={() => setLocation(card.name)}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Portal;
