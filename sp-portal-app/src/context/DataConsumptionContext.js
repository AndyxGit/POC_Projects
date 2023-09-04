import { AlertComponent } from 'components/Alert/Alert';
import React, { useState, useCallback, useEffect } from 'react';

export const DataConsumptionContext = React.createContext({
    hasErrors: {},
    showAlert: false,
    addError: () => { },
    removeError: () => { },
    closeAlert: () => { },
});

export default function DataConsumptionContextProvider({ children }) {
    const [hasErrors, setHasErrors] = useState({
        type: '',
        title: '',
        subtitle: ''
    });
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
       
        if (hasErrors.title.length || hasErrors.subtitle.length) {
            window.addEventListener("keydown", (event) => {
                if (event.code === 'Escape') {
                    closeAlert();
                }
            });
        }
    }, [hasErrors]);

    const removeError = useCallback(() => {
        setHasErrors({
            title: '',
            subtitle: ''
        });
        setShowAlert(false);
    }, []);

    const closeAlert = () => {
        if (hasErrors.type === 'closeable') {
            setShowAlert(false);
            removeError();
        } else {
            setShowAlert(false);
        }
    };

    const addError = useCallback(({ type, title, subtitle }) => {
        setHasErrors({
            type,
            title,
            subtitle
        });
        setShowAlert(true);
    }, []);

    const contextValue = {
        hasErrors,
        showAlert,
        closeAlert: () => closeAlert(),
        addError: useCallback((type, message, status) => addError(type, message, status), []),
        removeError: useCallback(() => removeError(), [])
    };

    return (
        <DataConsumptionContext.Provider value={contextValue}>
            {children}
            {showAlert && <AlertComponent />}
        </DataConsumptionContext.Provider>
    );
}