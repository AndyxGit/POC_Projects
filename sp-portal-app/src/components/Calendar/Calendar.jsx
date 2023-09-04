import './Calendar.css'
import React, { useContext, useState, useEffect, useRef } from 'react';
import Switch from "react-switch";
import { styled } from '@mui/material/styles';
import tooltipIcon from '../../assets/tooltipIcon.png';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { DatePicker } from '@mui/x-date-pickers';
import { DataConsumptionContext } from 'context/DataConsumptionContext';
import { AppContext } from 'Context';

export const Calendar = ({ updateDateFrom, updateDateTo, dateTo, dateFrom }) => {
  const [isChecked, setIsChecked] = useState(true);
  const { removeError, addError } = useContext(DataConsumptionContext);
  const [fromError, setFromError] = useState(null);
  const [toError, setToError] = useState(null);
  const { number } = useContext(AppContext);
  const refDateFrom = useRef(dateFrom);
  const refDateTo = useRef(dateTo);

  useEffect(() => {  
    if(isChecked && number === "") {
      updateDateFrom(refDateFrom.current);
      updateDateTo(refDateTo.current);
    }
    else if (!isChecked) {
      updateDateFrom(moment(new Date()));
    }
    else {   
      updateDateFrom(moment(new Date()).subtract(2, 'days'));
      updateDateTo(moment(new Date()));
    }
  }, [isChecked, number]);

  useEffect(() => {
    if (fromError !== null || toError !== null) {
      addError({
        type: 'calendar',
        title: 'Fecha inválida',
        subtitle: 'Ingrese fecha con formato dd/mm/aaaa.'
      });
    } else {
      removeError();
    }
  }, [fromError, toError]);

  const onHandleChange = () => {
    setIsChecked(!isChecked);
  }

  const handleChangeFrom = (newValue) => {
    if (newValue === null || newValue === undefined) {
      updateDateFrom(null);
      return;
    }
    if (!isChecked) {
      updateDateTo(new Date(newValue));
    }
    updateDateFrom(new Date(newValue));
  };

  const handleChangeTo = (newValue) => {
    if (newValue === null || newValue === undefined) {
      updateDateTo(null);
      return;
    }

    updateDateTo(new Date(newValue));
  };

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} title="Rango mayor a un mes, puede demorar la carga de datos." placement="right-start" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <>
      <div className='switchContainer'>
        <Switch
          aria-label='Switch Rango de Fecha'
          id="filters-switch"
          onChange={onHandleChange}
          checked={isChecked}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor='#4795AB'
          width={40}
          height={20}
          tabIndex={30}
          className='switch'
        />
        Rango de fecha
        <BootstrapTooltip>
          <img src={tooltipIcon} width={16.5} height={16.5} alt='tooltip' className='tooltip' />
        </BootstrapTooltip>
      </div>

      <div className='datePickerContainer'>
        <div className='selectLabel'>{isChecked ? <><div>Fecha desde</div><div style={{ color: 'red' }}>*</div></> : 'Fecha'}</div>
        <LocalizationProvider adapterLocale={moment.locale()} dateAdapter={AdapterMoment}>
          <DatePicker
            inputFormat="DD/MM/YYYY"
            value={dateFrom}
            onError={(e) => setFromError(e)}
            id='from-date-calendar'
            OpenPickerButtonProps={{ tabIndex: 33, title: isChecked ? 'Fecha desde' : 'Fecha', type: 'date', "aria-label": isChecked ? 'Abrir calendario desde' : 'Abrir calendario' }}
            inputProps={{ tabIndex: 32 }}
            onChange={(newValue) => handleChangeFrom(newValue)}
            maxDate={isChecked ? dateTo : new Date()}
            renderInput={(params) => <TextField   
              id='from-date-input'
              {...params}
              className='Calendar'
              size="small"
            />}

          />
        </LocalizationProvider>
      </div>
      {isChecked &&
        <div className='datePickerContainer'>
          <div className='selectLabel'>
            <div>Fecha hasta</div><div style={{ color: 'red' }}>*</div>
          </div>
          <LocalizationProvider adapterLocale={moment.locale()} dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              inputFormat="DD/MM/YYYY"
              aria-hidden="true"
              value={dateTo}
              minDate={dateFrom}
              onError={(e) => setToError(e)}
              maxDate={new Date()}
              id='to-date-calendar'
              OpenPickerButtonProps={{ tabIndex: 35, title: 'Fecha hasta', type: 'date', "aria-label": 'Abrir calendario hasta' }}
              inputProps={{ tabIndex: 34 }}
              onChange={(newValue) => handleChangeTo(newValue)}
              renderInput={(params) => <TextField         
                id='to-date-input'
                size="small" {...params}
                className='Calendar' />}
            />
          </LocalizationProvider>
        </div>
      }
    </>
  );
}
