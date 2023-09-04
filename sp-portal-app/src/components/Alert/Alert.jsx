import React, { useContext } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { DataConsumptionContext } from 'context/DataConsumptionContext';

export const AlertComponent = () => {
    const { hasErrors, closeAlert } = useContext(DataConsumptionContext);

    return (
        <Stack sx={{ width: 'auto' }} className='errorMessageContainer'>
            <Alert severity="error" role="alert" className='errorMessage' style={{ backgroundColor: '#FFD4D4' }} children={
                <div className='alertChildren'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontWeight: 700 }}>
                        <div style={{ fontSize: 15, color: 'black', fontFamily: 'Open Sans' }}>{hasErrors.title} </div>
                        <Icon role='button' path={mdiClose} className='closeButton' onClick={() => closeAlert() }> x </Icon>
                    </div>
                    <div style={{ fontSize: 13, color: 'black', fontFamily: 'Open Sans' }}>{hasErrors.subtitle}</div>
                </div>
            } />
        </Stack>
    )
}