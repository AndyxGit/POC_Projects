import React from 'react';
import { fireEvent } from '@testing-library/react';
import Portal from './Portal';
import { AppContext } from 'Context';
import { LineCheckContext } from 'context/LineCheckContext';
import { render } from "../../utils/testUtils";

jest.mock("../../utils/session.js", () => ({
  createSessionId: jest.fn(() => "session-id"),
}));

describe('Portal component', () => {

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


  it('should render the component with the available cards', () => {
    const mockSetLocation = jest.fn();
    const providerProps = {
      value: {
        setLocation: mockSetLocation,
        number: "1163456789",
        country : { value: "ar" },
        invalidPhoneNumber: "1163456789"
      }, 
    };
    const { getByText, getByTitle } = render(<Portal />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
      ],
  }); 
    expect(getByText('Aplicaciones disponibles')).toBeInTheDocument();
    expect(getByTitle('Tarjeta Consumo de Datos')).toBeInTheDocument();

    fireEvent.click(getByTitle('Tarjeta Consumo de Datos'));

    expect(mockSetLocation).toHaveBeenCalledWith('Consumo de Datos');
  });
});
