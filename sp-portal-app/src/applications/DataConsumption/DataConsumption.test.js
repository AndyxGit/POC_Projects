import { render } from '@testing-library/react';
import { DataConsumption } from './DataConsumption';
import DataConsumptionContextProvider from '../../context/DataConsumptionContext';

describe('DataConsumption', () => {
    it('should render filters and table', () => {
        const { getByText } = render(
            <DataConsumptionContextProvider>
                <DataConsumption />
            </DataConsumptionContextProvider>
        );
        expect(getByText('Filtros')).toBeInTheDocument();
        expect(getByText('Consumos')).toBeInTheDocument();
    });
    it('should add resize event listener to window and update state when browser zoom level is 200', () => {
        const { container } = render(
            <DataConsumptionContextProvider>
                <DataConsumption />
            </DataConsumptionContextProvider>
        );
        window.dispatchEvent(new Event('resize'));
        expect(container.firstChild).toHaveClass('dataConsumptioncontainer');
    });
});

