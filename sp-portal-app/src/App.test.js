import React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';
import { getUserInfo } from './services/entitiesService';
import { AppContext } from 'Context';
import { PSP_URL } from 'config/config.env';
import { render } from "./utils/testUtils";
import { LineCheckContext } from 'context/LineCheckContext';
import userEvent from '@testing-library/user-event';

jest.mock('services/entitiesService', () => ({
    getUserInfo: jest.fn(),
}));

jest.mock("./config/config.env", () => ({
    MEMBER_OF_GROUP: "GROUP_A",
    HEADER: {
        CONTENT_TYPE: "REACT_APP_CONTENT_TYPE",
        CHANNEL_ID: "REACT_APP_CHANNEL_ID",
    }
}))

jest.mock("./utils/session.js", () => ({
    createSessionId: jest.fn(() => "session-id"),
}));

describe('App', () => {

    const lineCheck = {
        codeError: "",
        hasErrors: false,
        loading: false,
        typeLine: "",
    }    
    const providerPropsLineCheck = {
        value: {
            lineCheck, 
            setTypeLine : () => {}, 
            setHasErrors: () => {}, 
            setCodeError: () => {}, 
            setHasErrors: () => {}
        }
  }


  afterEach(() => {
    delete global.crypto;
    });


    it('should call getUserInfo and setUser when mounted', async () => {
        const mockResponse = {
            preferred_username: 'testUser',
            member_of: ['GROUP_A', 'GROUP_B'],
        };
        getUserInfo.mockResolvedValue(mockResponse);
        const setShowPermissionsModal = jest.fn();
      
        render(<App />, {
            contexts: [
              { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
            ],
        });
        const iconUser = screen.queryByTestId("icon_user_sidebar_0");
        userEvent.hover(iconUser);
        const tooltipUser = await screen.findByText("testUser");
        await waitFor(() => {        
            expect(getUserInfo).toHaveBeenCalled();
            expect(setShowPermissionsModal).not.toHaveBeenCalled();
            expect(tooltipUser).toBeInTheDocument();
        })  
        
    });

    it('should call getUserInfo and not call setUser or setShowPermissionsModal when getUserInfo throws an error', async () => {
        getUserInfo.mockRejectedValue(new Error('getUserInfo error'));
        const setUser = jest.fn();
        const setShowPermissionsModal = jest.fn();
       
        render(<App />, {
            contexts: [
              { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
            ],
        });
        expect(getUserInfo).toHaveBeenCalled();
        expect(setUser).not.toHaveBeenCalled();
        expect(setShowPermissionsModal).not.toHaveBeenCalled();
    });

    it('Renders sidebar and title', () => {
        const { getByText, getByPlaceholderText } = render(<App />, {
            contexts: [
              { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
            ],
        })
        const titleElement = getByText('PP-CS');
        const sidebarElement = getByPlaceholderText('Número de Línea');

        expect(titleElement).toBeInTheDocument();
        expect(sidebarElement).toBeInTheDocument();
    });

    it('Shows cards and use location', async () => {
        const valueProviderApp = { value: {location: 'PP-CS', setLocation: jest.fn() } };
        const { getByTitle } = render(<App />, {
            contexts: [
              { provider: AppContext.Provider, props: valueProviderApp },
              { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
            ],
        });
     
      
        const cardButton = getByTitle('Tarjeta Consumo de Datos');
        expect(valueProviderApp.value.location).toBe('PP-CS')
        expect(cardButton).toBeInTheDocument();
    });

    it('Shows sidebar and click logout button to show modal', () => {
        const { getByTitle, getByText } = render(<App />, {
            contexts: [
              { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
            ],
        });
        
        const replaceMock = jest.fn();
        const locationSpy = jest.spyOn(window.parent, 'location', 'get');
        locationSpy.mockReturnValue({
          replace: replaceMock
        });

        const cardButton = getByTitle("Menú - Botón Cerrar Sesión");
        expect(cardButton).toBeInTheDocument();
        act(() => fireEvent.click(cardButton));

        const logoutModalText = getByText("¿Confirmar cierre de sesión?");
        expect(logoutModalText).toBeInTheDocument();

        const logoutButton = getByText("Cerrar Sesión");
        expect(logoutButton).toBeInTheDocument();
        
        act(() => fireEvent.click(logoutButton));
        expect(replaceMock).toHaveBeenCalledWith(`${PSP_URL}/logout`);
        locationSpy.mockRestore();

    });


});
