import { useContext, useState } from "react";
import { AppContext } from "Context";
import { DataConsumptionContext } from "context/DataConsumptionContext";
import { errorHandlingLineData } from "../errorHandling/lineData";
import { LineDataService } from "../services";
import { LEVEL } from "../../../constants";

export const useLineDataService = (setOpenAccordion) => {
  const { addError } = useContext(DataConsumptionContext);
  const { user } = useContext(AppContext);

  const [loadingLineData, setLoadingLineData] = useState(false);
  const [errorLineData, setErrorLineData] = useState(false);
  const [lineData, setLineData] = useState(null);

  const phoneData = JSON.parse(localStorage.getItem("phoneData"));

  const resetValuesLineData = () => {
    setLoadingLineData(false);
    setLineData(null);
    setErrorLineData(false);
  }

  const callServiceLineData = async () => {
    setLoadingLineData(true);
    const lineCheckLocalStorage = localStorage.getItem("lineCheck");
    try {
      const country = phoneData.country.value;
      const { msisdn, rplId, cellularNumber } = JSON.parse(lineCheckLocalStorage);
      const data = await LineDataService({
        cellularNumber,
        userId: user,
        rplId,
        msisdn,
        country,
      });
      handleLineDataResponse(data);
    } catch (error) {
      handleError(error);
      setErrorLineData(true)
    } finally {
      setLoadingLineData(false);
    }
  };

  const handleLineDataResponse = (data) => {
    const { level, error } = data.serviceDetails;
    const lowerCaseLevel = level.toLowerCase();

    if (lowerCaseLevel === LEVEL.SUCCESS || lowerCaseLevel === LEVEL.WARNING) {
      setLineData(data);
    } else {
      handleError(error);
    }
  };

  const handleError = (error) => {
    const externalError = error?.response?.data?.serviceDetails?.error;
    const codeError = Number(externalError ? externalError : error);
    addError(errorHandlingLineData(codeError));
    setErrorLineData(true);
    setOpenAccordion(false);
  };

  return {
    errorLineData,
    loadingLineData,
    lineData,
    resetValuesLineData,
    callServiceLineData,
  };
};
