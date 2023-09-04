import { renderHook, act } from '@testing-library/react';
import { useTableData } from './useTableData';
import { DataConsumptionContext } from 'context/DataConsumptionContext';
import { AppContext } from 'Context';

const numberStorage = {
    phone: '1234567891',
};

describe('useTableData', () => {
    test('should return initial values', () => {
        const { result } = renderHook(() => useTableData());
        expect(result.current.filters).toStrictEqual([]);
        expect(result.current.socialNetworks).toBeUndefined();
        expect(result.current.data).toEqual([]);
        expect(result.current.totalCost).toEqual(0);
        expect(result.current.totalVolume).toEqual(0);
        expect(result.current.message.title).toEqual('');
        expect(result.current.message.subtitle).toEqual('Para realizar una consulta, por favor, ingrese un número de línea.');
        expect(result.current.loading).toEqual(false);
    });

    test('should set the message title to "Aún no se han consultado datos" when numberStorage is truthy', () => {
        const wrapper = ({ children }) => (
            <DataConsumptionContext.Provider value={{ addError: jest.fn(), removeError: jest.fn() }}>
                <AppContext.Provider value={{ number: '1234567891', country: { value: 'ar' } }}>
                    {children}
                </AppContext.Provider>
            </DataConsumptionContext.Provider>
        );
        localStorage.setItem('phoneData', JSON.stringify(numberStorage));
        const { result } = renderHook(() => useTableData(), { wrapper });

        expect(result.current.message.title).toBe('Aún no se han consultado datos');
    });
});
