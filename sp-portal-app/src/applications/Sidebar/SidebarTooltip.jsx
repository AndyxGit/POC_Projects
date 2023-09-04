import React from 'react';
import Grid from '@mui/material/Grid';

export const SidebarTooltip = ({ name }) => (
    <>
        <svg width="15" height="59" viewBox="0 0 2 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 13.5L0 19.5L6 25.5V13.5Z" fill="#000000" />
        </svg>
        <Grid className='sidebarTooltipContainer'>
            <Grid className='sidebarTooltipText'>{name}</Grid>
        </Grid>
    </>
)