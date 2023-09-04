import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'moment/locale/es';
import moment from 'moment';
import {REACT_APP_BASE_URL_PROXY, REACT_APP_GET_FILTERS_AR_P01, REACT_APP_GET_FILTERS_PY_P01, REACT_APP_GET_FILTERS_UY_P01, REACT_APP_GET_TABLE_INFO_AR_P01, REACT_APP_GET_TABLE_INFO_PY_P01, REACT_APP_GET_TABLE_INFO_UY_P01, REACT_APP_MEMBER_OF_GROUP_P01, REACT_APP_GET_USER_INFO, REACT_APP_TZ, REACT_APP_CLARO_HOME_URL, REACT_APP_PSP_URL, REACT_APP_CONTENT_TYPE, REACT_APP_CHANNEL_ID, REACT_APP_LINE_DATA_PATH, REACT_APP_LINE_CHECK_PATH } from './config';
import LineCheckContextContextProvider from 'context/LineCheckContext';
import DataConsumptionContextProvider from 'context/DataConsumptionContext';

moment.locale('es');
window.LINE_CHECK_PATH= REACT_APP_LINE_CHECK_PATH; window.LINE_DATA_PATH = REACT_APP_LINE_DATA_PATH  ;window.BASE_URL_PROXY = REACT_APP_BASE_URL_PROXY; window.CONTENT_TYPE = REACT_APP_CONTENT_TYPE; window.PSP_URL = REACT_APP_PSP_URL; window.CLARO_HOME_URL = REACT_APP_CLARO_HOME_URL; window.CHANNEL_ID = REACT_APP_CHANNEL_ID; window.TZ = REACT_APP_TZ; window.MEMBER_OF_GROUP_P01 = REACT_APP_MEMBER_OF_GROUP_P01; window.GET_FILTERS_AR_P01 = REACT_APP_GET_FILTERS_AR_P01; window.GET_FILTERS_UY_P01 = REACT_APP_GET_FILTERS_UY_P01; window.GET_FILTERS_PY_P01 = REACT_APP_GET_FILTERS_PY_P01; window.GET_TABLE_INFO_AR_P01 = REACT_APP_GET_TABLE_INFO_AR_P01; window.GET_TABLE_INFO_UY_P01 = REACT_APP_GET_TABLE_INFO_UY_P01; window.GET_TABLE_INFO_PY_P01 = REACT_APP_GET_TABLE_INFO_PY_P01; window.GET_USER_INFO = REACT_APP_GET_USER_INFO;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DataConsumptionContextProvider>
      <LineCheckContextContextProvider>
        <App />
      </LineCheckContextContextProvider>
    </DataConsumptionContextProvider>
);

reportWebVitals();

export default {};