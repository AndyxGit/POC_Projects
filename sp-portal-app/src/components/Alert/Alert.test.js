import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataConsumptionContext } from 'context/DataConsumptionContext';
import { AlertComponent } from './Alert';

describe('AlertComponent', () => {
  test('renders the error message with title and subtitle', () => {
    const hasErrors = {
      title: 'Error Title',
      subtitle: 'Error Subtitle',
    };

    const closeAlert = jest.fn();

    render(
      <DataConsumptionContext.Provider value={{ hasErrors, closeAlert }}>
        <AlertComponent />
      </DataConsumptionContext.Provider>
    );

    const alertTitle = screen.getByText('Error Title');
    const alertSubtitle = screen.getByText('Error Subtitle');
    const closeButton = screen.getByRole('button');

    expect(alertTitle).toBeInTheDocument();
    expect(alertSubtitle).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    userEvent.click(closeButton);

    expect(closeAlert).toHaveBeenCalledTimes(1);
  });
});
