import { useContext } from "react";
import { LEVEL } from "../../../constants";
import { errorHandlingLineCheck } from "../errorHandling/lineCheck";
import { LineCheckService } from "../services";
import { DataConsumptionContext } from "context/DataConsumptionContext";
import { LineCheckContext } from "context/LineCheckContext";
import { AppContext } from "Context";

export const useLineCheckService = ({ inputNumber, inputCountry }) => {
  const { user } = useContext(AppContext);
  const { addError } = useContext(DataConsumptionContext);
  const { setLoading, setCodeError, setHasErrors, setTypeLine } = useContext(LineCheckContext);

  const resetLineCheck = () => {
    setLoading(false);
    setCodeError("");
    setHasErrors(false);
    setTypeLine("");
  }

  const callServiceLineCheck = async () => {
    setLoading(true);
    try {
      const {
        serviceDetails: { level, error },
        ...rest
      } = await LineCheckService({
        lineNumber: inputNumber,
        userId: user,
        country: inputCountry.value,
      });

      handleLineCheckResponse(level.toLowerCase(), rest, Number(error));
    } catch (error) {
      setHasErrors(true);
      if (error?.response?.data.serviceDetails?.error) {      
        const codeError = error?.response?.data.serviceDetails && Number(error.response.data.serviceDetails.error);
        setCodeError(codeError);
        addError(errorHandlingLineCheck(codeError));
      }
      else{
        addError(errorHandlingLineCheck());
        setCodeError(error.code);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLineCheckResponse = (level, dataResponse, error) => {
    if (level === LEVEL.WARNING) {
      setTypeLine("CO");
      setCodeError(error);
      setHasErrors(true);
    } else if (level === LEVEL.SUCCESS) {
      localStorage.setItem("lineCheck", JSON.stringify(dataResponse));
    } else {
      addError(errorHandlingLineCheck(error));
      setCodeError(error);
      setHasErrors(true);
    }
  };

  return {
    callServiceLineCheck,
    resetLineCheck,
  };
};
