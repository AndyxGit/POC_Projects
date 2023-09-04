import './Table.css'
import React, { useState, useEffect, useContext } from 'react'
import { Text, SelectInput } from '../../../components';
import 'react-day-picker/dist/style.css';
import moment from 'moment';
import { PAGINATION_OPTIONS } from '../paginationOptions';
import { mdiChevronLeft, mdiChevronRight, mdiArrowDownThin, mdiArrowUpThin } from '@mdi/js';
import warningIcon from '../../../assets/warningIcon.png';
import Icon from '@mdi/react'
import { formatCost, orderByCost, orderByDate, orderByService, orderByVolume } from './tableUtils';
import { round } from 'lodash';
import { AppContext } from 'Context';

export const Table = ({ data, totalCost, totalVolume, message, loading }) => {
    const [paginationNumber, setPaginationNumber] = useState(1);
    const [paginationData, setPaginationData] = useState([]);
    const [paginationSize, setPaginationSize] = useState([]);
    const [paginationCount, setPaginationCount] = useState(15);
    const [orderKey, setOrderKey] = useState({
        key: '',
        isAscending: false,
    });
    const { country } = useContext(AppContext);

    useEffect(() => {
        if (data.length) {
            const pageCounter = Array.from({
                length: Math.ceil(data.length / paginationCount)
            },
                function (a, b) {
                    return b + 1;
                }
            );
            setPaginationSize(pageCounter);

            if (orderKey.key !== undefined) {
                switch (orderKey.key) {
                    case 'service':
                        const byServiceArray = orderByService(data, orderKey.isAscending);
                        setPaginationData(byServiceArray.slice((paginationNumber - 1) * paginationCount, paginationNumber * paginationCount));
                        break;

                    case 'volume':
                        const byVolumeArray = orderByVolume(data, orderKey.isAscending);
                        setPaginationData(byVolumeArray.slice((paginationNumber - 1) * paginationCount, paginationNumber * paginationCount));
                        break;

                    case 'cost':
                        const byCostArray = orderByCost(data, orderKey.isAscending);
                        setPaginationData(byCostArray.slice((paginationNumber - 1) * paginationCount, paginationNumber * paginationCount));
                        break;

                    case 'date':
                        const byDateArray = orderByDate(data, orderKey.isAscending);
                        setPaginationData(byDateArray.slice((paginationNumber - 1) * paginationCount, paginationNumber * paginationCount));
                        break;
                    default:
                        break;
                }
            }
            setPaginationData(data.slice((paginationNumber - 1) * paginationCount, paginationNumber * paginationCount));
        } else {
            setPaginationData([]); setPaginationSize([]);
        }
    }, [paginationNumber, data, paginationCount, orderKey, orderByCost, orderByService, orderByVolume]);

    const onSelectPagination = (value) => { setPaginationCount(value); setPaginationNumber(1); }

    return (
        <div className='tableContainer'>
            <div className='tableHeader'>
                <Text text='Consumos' />
                <div className='paginationContainer'>
                    <div className='pagination'> {paginationNumber !== 1 &&
                            <div onClick={() => setPaginationNumber(paginationNumber - 1)} id='iconLeft' title='iconLeftContainer' >
                                <Icon path={mdiChevronLeft} size='16px' title='iconLeft' />
                            </div>}
                        <div className='paginationItem'>{paginationNumber}</div> {paginationNumber < paginationSize.length &&
                            <div onClick={() => setPaginationNumber(paginationNumber + 1)} id='iconRight' title="iconRightContainer">
                                <Icon path={mdiChevronRight} size='16px' title='iconRight' />
                            </div>}
                    </div>
                    <div className='countSelect'>
                        <div className='text'>Mostrar</div>
                        <div className='selectContainer'>
                            <SelectInput
                                placeholder={paginationCount}
                                options={PAGINATION_OPTIONS}
                                onChange={(e) => onSelectPagination(e.value)}
                                value={paginationCount}
                                tabIndex={50}
                                title="Selector Navigation"
                            />
                        </div>
                        <div className='text'>resultados</div>
                    </div>
                </div>
            </div>
            <div className='line' />
            {
                loading ?
                    <div className='emptyDataContainer'>
                        <div className="loading-spinner" />
                    </div>
                    :
                    (
                        !paginationData.length ?
                            <div className='emptyDataContainer'>
                                <img src={warningIcon} width={68} alt='warningIcon' style={{ marginBottom: 10 }} />
                                <div className='messageContainer'>
                                    <div className='messageTitle'>{message.title}</div>
                                    <div className='messageSubtitle'>{message.subtitle}</div>
                                </div>
                            </div>
                            :
                            <>
                                {/* pasar ésto a un const y mapearlo */}
                                <div className='tableRowWhite'>
                                    <div tabIndex={51} className='tableRowTitle' title="servicio" onKeyDown={(e) => e.code === 'Enter' && setOrderKey({ key: 'service', isAscending: !orderKey.isAscending })} onClick={() => setOrderKey({ key: 'service', isAscending: !orderKey.isAscending })}>Servicio <Icon path={orderKey.key === 'service' ? orderKey.isAscending ? mdiArrowDownThin : mdiArrowUpThin : mdiArrowDownThin} size='15px' className='listIcon' /></div>
                                    <div tabIndex={52} className='tableRowTitle' title="precio" onKeyDown={(e) => e.code === 'Enter' && setOrderKey({ key: 'cost', isAscending: !orderKey.isAscending })} onClick={() => setOrderKey({ key: 'cost', isAscending: !orderKey.isAscending })}>Precio <Icon path={orderKey.key === 'cost' ? orderKey.isAscending ? mdiArrowDownThin : mdiArrowUpThin : mdiArrowDownThin} size='15px' className='listIcon' /></div>
                                    <div tabIndex={53} className='tableRowTitle' title="trafico" onKeyDown={(e) => e.code === 'Enter' && setOrderKey({ key: 'volume', isAscending: !orderKey.isAscending })} onClick={() => setOrderKey({ key: 'volume', isAscending: !orderKey.isAscending })}>Tráfico <Icon path={orderKey.key === 'volume' ? orderKey.isAscending ? mdiArrowDownThin : mdiArrowUpThin : mdiArrowDownThin} size='15px' className='listIcon' /></div>
                                    <div tabIndex={54} className='tableRowTitle' >Roaming <Icon path={mdiArrowDownThin} size='15px' className='listIcon' /></div>
                                    <div tabIndex={55} className='tableRowTitle' title="fecha" onKeyDown={(e) => e.code === 'Enter' && setOrderKey({ key: 'date', isAscending: !orderKey.isAscending })} onClick={() => setOrderKey({ key: 'date', isAscending: !orderKey.isAscending })}>Fecha <Icon path={orderKey.key === 'date' ? orderKey.isAscending ? mdiArrowDownThin : mdiArrowUpThin : mdiArrowDownThin} size='15px' className='listIcon' /></div>
                                </div>
                                {
                                    paginationData.map((item, index) => {
                                        return (
                                            <div className={index % 2 === 0 ? 'tableRowWhite' : 'tableRowGrey'} key={index} tabIndex={60 + index}>
                                                <div className='tableRowItem' aria-label={`Servicio: ${item.ratingGroupDescription} :`} >{item.ratingGroupDescription}</div>
                                                <div className='tableRowItem' aria-label={`Precio: ${country.value === 'py' ? 'Guaraníes' : 'Pesos'} ${item.cost.value} :`} >{formatCost(item.cost.currency, item.cost.value)}</div>
                                                <div className='tableRowItem' aria-label={`Tráfico: ${Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(round(item.volume.value, 2)).toFixed(2))} ${item.volume.unit} :`}>{Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(round(item.volume.value, 2)).toFixed(2))} {item.volume.unit}</div>
                                                <div className='tableRowItem' aria-label={`Roaming: ${item.roaming ? 'si' : 'no'} :`} >{item.roaming ? 'SI' : 'NO'}</div>
                                                <div className='tableRowItem' aria-label={`Fecha: ${moment(new Date(item.cdrDate.dateTime)).format("DD/MM/YYYY")} :`}>{moment(new Date(item.cdrDate.dateTime)).format("DD/MM/YYYY")}</div>
                                            </div>)
                                    })
                                }
                                <div className='totalValuesContainer' tabIndex={200} aria-label={`Total período consultado: Precio total: ${totalCost} : Tráfico total: ${totalVolume} :`}>
                                    <div className='totalValuesTitle'> Total período consultado </div>
                                    <div className='totalValues'>
                                        <div aria-hidden='true'>{totalCost}</div>
                                        <div aria-hidden='true' style={{ marginLeft: 30 }}>{totalVolume} MB</div>
                                    </div>
                                </div>
                            </>
                    )
            }
        </div>
    )
}