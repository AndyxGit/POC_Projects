import React, { useCallback, useMemo, useState } from "react";

export const LineCheckContext = React.createContext();

export default function LineCheckContextContextProvider({ children }) {
  const [lineCheck, setLineCheck] = useState({
    hasErrors: false,
    codeError: "",
    loading: false,
    typeLine: "",
  });

  const setHasErrors = useCallback((hasErrors) => {
    setLineCheck((prevValue) => ({ ...prevValue, hasErrors }));
  },[]);

  const setCodeError = useCallback((codeError) => {
    setLineCheck((prevValue) => ({ ...prevValue, codeError }));
  },[])

  const setLoading = useCallback((loading) => {
    setLineCheck((prevValue) => ({ ...prevValue, loading }));
  },[])

  const setTypeLine = useCallback((typeLine) => {
    setLineCheck((prevValue) => ({ ...prevValue, typeLine }));
  },[])

  const value = useMemo(
    () => ({
      setTypeLine,
      setHasErrors,
      setCodeError,
      setLoading,
      lineCheck,
    }),
    [setHasErrors, setCodeError, setLoading, setTypeLine, lineCheck]
  );

  return (
    <LineCheckContext.Provider value={value}>
      {children}
    </LineCheckContext.Provider>
  );
}
