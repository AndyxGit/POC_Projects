import { AppContext } from "Context";
import { round } from "lodash";
import { useState, useEffect, useContext } from "react";
import { ENDPOINTS, HEADER, TZ } from "../config/config.env";
import { DataConsumptionContext } from "context/DataConsumptionContext";
import { showFiltersError, showOnSaveError,  } from "./utils";
import { getFiltersService } from "../services/getFiltersService";
import { formatCost } from "applications/DataConsumption/Table/tableUtils";
import { createSessionId } from "utils/session";

export const useTableData = () => {
    const [totalCost, setTotalCost] = useState(0);
    const [totalVolume, setTotalVolume] = useState(0);
    const [filters, setFilters] = useState();
    const [loading, setLoading] = useState(false);
    const [socialNetworks, setSocialNetworks] = useState();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState({
        title: '',
        subtitle: '',
    });
    const { number, country, user } = useContext(AppContext);
    const { addError, removeError } = useContext(DataConsumptionContext);

    useEffect(() => {
        if (number && country.value.length) {
            getFilters();
        }

        const numberStorage = JSON.parse(localStorage.getItem('phoneData'));

        if (!numberStorage) {
            setFilters([]);
            setMessage({
                title: '',
                subtitle: 'Para realizar una consulta, por favor, ingrese un número de línea.',
            });
            setData([]);
        }

        if ((numberStorage && numberStorage.phone && message.title !== 'Sin resultados que coincidan con su búsqueda')) {
            setMessage({
                title: 'Aún no se han consultado datos',
                subtitle: 'Por favor, haga click en "Consultar"'
            })
        }
    }, [number, country]);

    const onSave = async (info) => {
        setLoading(true);
        const ENDPOINT_URL_DATA = country.value === 'ar' ? ENDPOINTS.GET_TABLE_INFO_AR : country.value === 'uy' ? ENDPOINTS.GET_TABLE_INFO_UY : ENDPOINTS.GET_TABLE_INFO_PY;
        const selectedFiltersData = info.selectedFilters[0] === null ? info.selectedFilters = null : info.selectedFilters;

        const sessionId = createSessionId();

        const headers = {
            'Content-Type': HEADER.CONTENT_TYPE,
            'Session-Id': sessionId,
            'Channel-Id': HEADER.CHANNEL_ID,
            'User-Id': user,
            'BillNumber': number,
            'Accept': 'application/json'
        }

        const body = {
            'dateFrom': { 'dateTime': `${info.dateFrom} 00:00:00.000 ${TZ}`, 'format': 'yyyy-MM-dd HH:mm:ss.SSS Z' },
            'dateTo': { 'dateTime': `${info.dateTo} 00:00:00.000 ${TZ}`, 'format': 'yyyy-MM-dd HH:mm:ss.SSS Z' },
            'filterList': { 'roaming': info.roaming, 'ratingGroupList': selectedFiltersData }
        }

        await fetch(ENDPOINT_URL_DATA, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.resultCode !== '0') {
                    const errorResponse = showOnSaveError(responseData.resultCode);
                    addError({
                        type: errorResponse.type,
                        title: errorResponse.title,
                        subtitle: errorResponse.subtitle
                    });
                }
                else if (!responseData.dataConsumptionDetailsList.length) {
                    addError({
                        type: 'closeable',
                        title: 'Número de Línea',
                        subtitle: 'No se encontraron consumos para la búsqueda realizada.'
                    });
                    setMessage({
                        title: 'Sin resultados que coincidan con su búsqueda',
                        subtitle: 'Por favor, revise los campos e intente nuevamente.'
                    });
                    setData([]);
                } else {
                    removeError();
                    setData(responseData.dataConsumptionDetailsList);
                    let totalVolumeSum = 0;
                    let totalCostSum = 0;

                    responseData.dataConsumptionDetailsList.forEach((item) => {
                        totalVolumeSum = totalVolumeSum + item.volume.value;
                        totalCostSum = totalCostSum + item.cost.value;
                    });

                    const finalTotalCost = formatCost(responseData.dataConsumptionDetailsList[0].cost.currency, totalCostSum);
                    setTotalCost(finalTotalCost);
                    setTotalVolume(Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(round(totalVolumeSum, 2)).toFixed(2)));
                }
            }).catch(err => {
                return addError({
                    type: 'closeable',
                    title: 'Servicio no disponible',
                    subtitle: 'Por favor, intente de nuevo mas tarde.'
                });
            });
        setLoading(false);
        return data;
    }

    const getFilters = async () => {
        const filtersGetted = await getFiltersService(country.value, user);
        if (filtersGetted.resultCode !== '0') {
            const errorResponse = showFiltersError(filtersGetted.resultCode);
            addError({
                type: errorResponse.type,
                title: errorResponse.title,
                subtitle: errorResponse.subtitle
            })
        } else {

            const newArray = [];
            const SelectAllItem = {
                value: null,
                label: 'Todos'
            }
            newArray.push(SelectAllItem)

            filtersGetted.ratingGroupList.map((item) => {
                const data = {
                    value: item.ratingGroupId,
                    label: item.description
                }
                return newArray.push(data)
            });

            const socialNetworksArray = filtersGetted.ratingGroupSocialNetworkList.filter((item) => item.ratingGroupId);

            const selectAllSocialNetworks = {
                value: socialNetworksArray,
                label: 'Redes Sociales'
            };

            const socialNetworkIds = socialNetworksArray.map((item) => item.ratingGroupId);
            setSocialNetworks(socialNetworkIds);

            newArray.push(selectAllSocialNetworks);

            filtersGetted.ratingGroupSocialNetworkList.map((item) => {
                const data = {
                    value: item.ratingGroupId,
                    label: item.description
                };
                return newArray.push(data)
            });
            setFilters(newArray);
        }
    }

    return { filters, socialNetworks, data, onSave, totalCost, totalVolume, message, loading, getFilters };
}
