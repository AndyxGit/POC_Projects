import { act, render } from '@testing-library/react';
import React from 'react';
import DataConsumptionContextProvider, { DataConsumptionContext } from './DataConsumptionContext';

describe('DataConsumptionContextProvider', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <DataConsumptionContextProvider>
                <DataConsumptionContext.Consumer>
                    {({ hasErrors }) => (
                        <div>{JSON.stringify(hasErrors)}</div>
                    )}
                </DataConsumptionContext.Consumer>
            </DataConsumptionContextProvider>,
        );
        expect(container).toBeDefined();
    });

    it('adds and removes errors', () => {
        const { container } = render(
            <DataConsumptionContextProvider>
                <DataConsumptionContext.Consumer>
                    {({ addError, removeError }) => (
                        <div>
                            <button onClick={() => addError({ type: 'error', title: 'Error', subtitle: 'An error occurred' })}>
                                Add Error
                            </button>
                            <button onClick={() => removeError()}>
                                Remove Error
                            </button>
                        </div>
                    )}
                </DataConsumptionContext.Consumer>
            </DataConsumptionContextProvider>,
        );
        const addButton = container.querySelector('button:nth-of-type(1)');
        const removeButton = container.querySelector('button:nth-of-type(2)');

        expect(container.textContent).toEqual("Add ErrorRemove Error");

        act(() => addButton.click());
        expect(container.textContent).toContain("Add ErrorRemove ErrorError An error occurred");
        expect(container.textContent).toContain("Add ErrorRemove ErrorError An error occurred");
        expect(container.textContent).toContain("Add ErrorRemove ErrorError An error occurred");

        act(() => removeButton.click());
        expect(container.textContent).toEqual("Add ErrorRemove Error");
    });

    it('closes the alert on Escape key press', () => {
        const { container } = render(
            <DataConsumptionContextProvider>
                <DataConsumptionContext.Consumer>
                    {({ addError, closeAlert }) => (
                        <div>
                            <button onClick={() => addError({ type: 'closeable', title: 'Closeable Alert', subtitle: 'Click close to dismiss' })}>
                                Add Closeable Alert
                            </button>
                            <button onClick={() => closeAlert()}>
                                Close Alert
                            </button>
                        </div>
                    )}
                </DataConsumptionContext.Consumer>
            </DataConsumptionContextProvider>,
        );
        const addButton = container.querySelector('button:nth-of-type(1)');
        const closeButton = container.querySelector('button:nth-of-type(2)');

        act(() => addButton.click());
        expect(container.querySelector('.alert')).toBeDefined();

        act(() => {
            const escapeEvent = new KeyboardEvent('keydown', { code: 'Escape' });
            window.dispatchEvent(escapeEvent);
        });

        expect(container.querySelector('.alert')).toBeNull();

        act(() => closeButton.click());
        expect(container.textContent).toEqual("Add Closeable AlertClose Alert");
    });
});
