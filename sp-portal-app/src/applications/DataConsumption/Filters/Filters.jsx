import './Filters.css'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Calendar, SelectInput } from '../../../components';
import roamingButtons from '../roamingButtons';
import moment from 'moment';
import { onChangeFilters } from './filtersUtils';
import { AppContext } from 'Context';
import { DataConsumptionContext } from 'context/DataConsumptionContext';

export const Filters = ({ filters, socialNetworks, onSave }) => {
    const [dateTo, setDateTo] = useState(moment(new Date()));
    const [dateFrom, setDateFrom] = useState(moment(new Date()).subtract(2, 'days'));
    const [geolocalization, setGeolocalization] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([{ value: null, label: 'Todos' }]);
    const { number } = useContext(AppContext);
    const { hasErrors, removeError } = useContext(DataConsumptionContext);

    useEffect(() => {
        if (!number) {
            removeError();
            setSelectedFilters([{ value: null, label: 'Todos' }]);
            setGeolocalization(null);
        }
    }, [number]);

    const onButtonClick = () => {
        const arrayFilters = [];
        selectedFilters.forEach((filter) => {
            if (typeof filter.value === 'object' && filter.value !== null) {
                return filter.value.map((socialNetwork) => arrayFilters.push(socialNetwork.ratingGroupId))
            } else {
                return arrayFilters.push(filter.value);
            }
        })

        const dataToSave = {
            'dateFrom': moment(new Date(dateFrom)).format("yyyy-MM-DD"),
            'dateTo': moment(new Date(dateTo)).format("yyyy-MM-DD"),
            'roaming': geolocalization,
            'selectedFilters': arrayFilters
        }
        onSave(dataToSave);
    }

    return (
        <div className='generalFilterContainer'>
            <div className='filterTitle'>
                Filtros
            </div>
            <div className='line' />
            <div className='filterContainers' >
                <Calendar updateDateFrom={(value) => setDateFrom(value)} updateDateTo={(value) => setDateTo(value)} dateTo={dateTo} dateFrom={dateFrom} />
                <div className='selectLabel'>Geolocalización<div style={{ color: 'red' }}>*</div> </div>
                <div className='buttonsContainer' tabIndex={40} aria-label='Contenedor de botones de geolocalización'>
                    {roamingButtons.map((item, index) =>
                        <div tabIndex={41+index} id={item.name} aria-label={item.title} className={geolocalization !== item.value ? item.className : item.selected} key={item.value} onKeyDown={(e) => e.code === 'Enter' && setGeolocalization(item.value)} onClick={() => setGeolocalization(item.value)}>
                            {item.name}
                        </div>
                    )}
                </div>
            </div>

            <div className='filterContainers'>
                <SelectInput
                    tabIndex={48}
                    value={selectedFilters}
                    defaultValue={selectedFilters}
                    isMulti
                    onChange={(e) => onChangeFilters(e, socialNetworks, selectedFilters, setSelectedFilters)}
                    name='filters-multiselect'
                    options={filters}
                    className="select"
                    label="Servicio"
                    disabled={!filters}
                    role="FiltersInput"
                    title="Selector Servicios"
                    id="filster-multiselect-id"
                />
            </div>
            <div className='filterContainers'>
                <Button title="Consultar" tabIndex={49} disabled={!number || !dateTo || !dateFrom || hasErrors.title.length || hasErrors.subtitle.length || !filters} text='Consultar' onButtonClick={() => onButtonClick()} />
            </div>
        </div>
    )
}