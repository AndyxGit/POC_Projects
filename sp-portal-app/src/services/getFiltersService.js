
import { createSessionId } from 'utils/session';
import { ENDPOINTS, HEADER } from '../config/config.env';

export const getFiltersService = async (country, user) => {
    const sessionId = createSessionId();
    const ENDPOINT_URL_FILTERS = country === 'ar' ? ENDPOINTS.GET_FILTERS_AR : country.value === 'uy' ? ENDPOINTS.GET_FILTERS_UY : ENDPOINTS.GET_FILTERS_PY;
    const headers = {
        "Content-Type": HEADER.CONTENT_TYPE,
        "Session-Id": sessionId,
        "Channel-Id": HEADER.CHANNEL_ID,
        "User-Id": user
    }

    const response = await fetch(ENDPOINT_URL_FILTERS, { headers })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });

    return response;
}