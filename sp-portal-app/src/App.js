import './App.css';
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { AppContext } from 'Context';
import { LineSearch } from './applications/LineSearch/LineSearch'
import Portal from './applications/Portal/Portal';
import { Sidebar } from './applications/Sidebar/Sidebar';
import { DataConsumption } from './applications/DataConsumption/DataConsumption';
import modalIcon from './assets/modalIcon.png'
import { Modal } from 'components/Modal/Modal';
import { MEMBER_OF_GROUP, PSP_URL } from './config/config.env';
import { getUserInfo } from 'services/entitiesService';
import DataConsumptionContextProvider from 'context/DataConsumptionContext';


function App() {
  
  const [user, setUser] = useState('');
  const [number, setNumber] = useState('');
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("");
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState('PP-CS');
  const [showSiderbarModal, setShowSidebarModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const response = await getUserInfo();
        if (response) {
          setUser(response.preferred_username);
          const hasRoles = response.member_of.filter((rol) => rol === MEMBER_OF_GROUP);
          if (!hasRoles.length) {
            setShowPermissionsModal(true)
          }
        }
      } catch (e) {
        setShowPermissionsModal(true);
      }
    })();
  }, []);


  const pages = [
    {
      name: 'PP-CS',
      component: (
        <Portal key="portal-app" />
      )
    },
    {
      name: 'Consumo de Datos',
      component: (
        <DataConsumptionContextProvider>
          <DataConsumption key="data-consumption-app" /> 
        </DataConsumptionContextProvider> 
      )
    }
  ];

  return (
   
    <AppContext.Provider value={{
      number,
      setNumber,
      invalidPhoneNumber,
      setInvalidPhoneNumber,
      location,
      setLocation,
      country,
      setCountry,
      setShowSidebarModal,
      user
    }}>
      <Grid className='container'>
        {
          showPermissionsModal ?
            <Modal
              confirmButtonText='Cerrar Sesión'
              deniedButtonText='Salir'
              icon={modalIcon}
              title="modal-permissions"
              message='No tenés permisos para acceder a esta aplicación.'
              onConfirmClick={() => window.location.replace(`${PSP_URL}/logout`)} onDeniedClick={() => window.close()}
            />
            :
            showSiderbarModal ?
              <Modal
                confirmButtonText='Cerrar Sesión'
                deniedButtonText='Volver'
                title="modal-logout"
                onConfirmClick={() => window.parent.location.replace(`${PSP_URL}/logout`)} onDeniedClick={() => setShowSidebarModal(false)}
                icon={modalIcon}
                message='¿Confirmar cierre de sesión?'
              />
              :

              <>
                <Sidebar className='sideBar' id='sideBarIframe' />
                <div className='verticalContainer'>

                  <Grid className='titleAndSearch'>
                    <div className='title' title={location}>{location}</div>
                    <DataConsumptionContextProvider>
                      <LineSearch id="searchPhoneIframe" title='search' className='search' />
                    </DataConsumptionContextProvider>
                  </Grid>

                  <Grid className='pagesContainer'> {pages.map((page) => {
                        if (page.name === location) {
                          return page.component;
                        }})}
                  </Grid>
                </div>
              </>
        }
      </Grid>
    </AppContext.Provider>
   
  );
}

export default App;
