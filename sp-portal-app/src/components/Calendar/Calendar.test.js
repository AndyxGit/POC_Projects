import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Calendar } from './Calendar';
import { AppContext } from 'Context';

describe('Calendar', () => {
  const updateDateFrom = jest.fn();
  const updateDateTo = jest.fn();
  const dateTo = new Date();
  const dateFrom = new Date();

  test('renders the switch and the date pickers', () => {
    const { getByLabelText, getByTitle } = render(<Calendar updateDateFrom={updateDateFrom} updateDateTo={updateDateTo} dateTo={dateTo} dateFrom={dateFrom} />);

    expect(getByLabelText('Switch Rango de Fecha')).toBeInTheDocument();
    expect(getByTitle('Fecha desde')).toBeInTheDocument();
    expect(getByTitle('Fecha hasta')).toBeInTheDocument();
  });

  test('switching the toggle updates the date range', () => {
    const { getByLabelText } = render(<Calendar updateDateFrom={updateDateFrom} updateDateTo={updateDateTo} dateTo={dateTo} dateFrom={dateFrom} />);

    fireEvent.click(getByLabelText('Switch Rango de Fecha'));

    expect(updateDateFrom).toHaveBeenCalled();
    expect(updateDateTo).toHaveBeenCalled();
  });

  test('selecting a date from the date picker updates the start date', () => {
    const { getByTitle } = render(<Calendar updateDateFrom={updateDateFrom} updateDateTo={updateDateTo} dateTo={dateTo} dateFrom={dateFrom} />);
    const datepickerFrom = getByTitle('Fecha desde');

    fireEvent.change(datepickerFrom, { target: { value: '01/05/2023' } });

    expect(updateDateFrom).toHaveBeenCalled();
  });

  test('selecting a date from the date picker updates the end date', () => {
    const { getByTitle } = render(<Calendar updateDateFrom={updateDateFrom} updateDateTo={updateDateTo} dateTo={dateTo} dateFrom={dateFrom} />);
    const datepickerTo = getByTitle('Fecha hasta');
    fireEvent.change(datepickerTo, { target: { value: '02/05/2023' } });
    expect(updateDateTo).toHaveBeenCalled();
  });

  test('Update calendar when Rango de Fecha is unchecked', () => {
    const { getByLabelText, getByTitle } = render(
      <AppContext.Provider value={{ number: '1234567891', country: 'ar' }}>
        <Calendar updateDateFrom={updateDateFrom} updateDateTo={updateDateTo} dateTo={dateTo} dateFrom={dateFrom} />
      </AppContext.Provider>);

    fireEvent.click(getByLabelText('Switch Rango de Fecha'));
    const datepicker = getByTitle('Fecha');
    expect(datepicker).toBeInTheDocument();
    fireEvent.change(datepicker, { target: { value: '02/05/2023' } });
    expect(updateDateFrom).toHaveBeenCalled();
  });
});
