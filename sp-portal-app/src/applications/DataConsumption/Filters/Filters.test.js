import React from 'react';
import { render, fireEvent,act } from '@testing-library/react';
import { Filters } from './Filters';
import moment from 'moment';
import { AppContext } from 'Context';
import DataConsumptionContextProvider from 'context/DataConsumptionContext';

describe('Filters component', () => {
  const filters = [
    { value: 1, label: 'Filter 1' },
    { value: 2, label: 'Filter 2' },
    { value: 3, label: 'Filter 3' },
  ];

  const socialNetworksMock = [
    { value: 1, label: 'SocialNetwork 1' },
    { value: 2, label: 'SocialNetwork 2' },
    { value: 3, label: 'SocialNetwork 3' },
  ];

  it('should render without errors', () => {
    const { getByText } = render(<Filters filters={filters} />);
    expect(getByText('Filtros')).toBeInTheDocument();
  });

  it('should update dateFrom and dateTo when Calendar component is updated', () => {
    const { getByDisplayValue } = render(<Filters filters={filters} />);
    const dateFromInput = getByDisplayValue(moment(new Date()).format("DD/MM/YYYY"));
    const dateToInput = getByDisplayValue(moment(new Date()).subtract(2, 'days').format("DD/MM/YYYY"));

    fireEvent.change(dateFromInput, { target: { value: '01-01-2022' } });
    expect(dateFromInput).toHaveValue('01/01/2022');

    fireEvent.change(dateToInput, { target: { value: '31-01-2022' } });
    expect(dateToInput).toHaveValue('31/01/2022');
  });

  it('should update geolocalization when roaming button is clicked', () => {
    const { getByText } = render(<Filters filters={filters} />);
    const roamingButton = getByText('Roaming');
    const homeButton = getByText('Home');

    fireEvent.click(roamingButton);
    expect(roamingButton).toHaveClass('rightSelectedButton');
    expect(homeButton).toHaveClass('centerButton');

    fireEvent.click(homeButton);
    expect(homeButton).toHaveClass('centerSelectedButton');
    expect(roamingButton).toHaveClass('rightButton');
  });

  it('should update selectedFilters when SelectInput component is updated', () => {
    const { getByRole } = render(<Filters filters={filters} />);
    const selectInput = getByRole('combobox');

    fireEvent.change(selectInput, {
      target: {
        value: [{ value: 1, label: 'Filter 1' }, { value: 2, label: 'Filter 2' }],
      },
    });

    expect(selectInput).toHaveValue([
      { value: 1, label: 'Filter 1' },
      { value: 2, label: 'Filter 2' },
    ].toString());
  });

  test('renders consultar button', () => {
    const onSave = jest.fn();
    const filters = [];
    const socialNetworks = [];
    const { getByTitle } = render(<Filters filters={filters} socialNetworks={socialNetworks} onSave={onSave} />);
    const button = getByTitle('Consultar');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('onSave must be called when Consultar button is clicked', () => {
    const onSaveMock = jest.fn();
    const { getByTitle } = render(
      <AppContext.Provider value={{ number: '1234567891', country: 'ar' }}>
        <DataConsumptionContextProvider value={{ hasErrors: { title: 'title', subtitle: 'subtitle' }}}>
          <Filters filters={filters} socialNetworks={socialNetworksMock} onSave={onSaveMock} />
        </DataConsumptionContextProvider>
      </AppContext.Provider>
    );
    const button = getByTitle('Consultar');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    act(() => fireEvent.click(button));
    expect(onSaveMock).toHaveBeenCalled();
  });

});
