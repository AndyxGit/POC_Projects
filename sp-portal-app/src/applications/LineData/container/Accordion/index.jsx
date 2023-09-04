import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "Context";
import { DataConsumptionContext } from "context/DataConsumptionContext";
import { AccordionHeader } from "applications/LineData/components";
import { subscribe, unsubscribe } from "../../../../utils/event";
import { errorHandlingLineCheck } from "applications/LineData/errorHandling/lineCheck";
import { LineCheckContext } from "context/LineCheckContext";
import { useLineDataService } from "applications/LineData/hooks/useLineDataService";
import BalancesSection from "../BalancesSection";
import LineStatesSection from "../LineStatesSection";
import BasicPillsContainer from "../BasicPillsContainer";
import Spinner from "components/Spinner/Spinner";
import warningIcon from "assets/warningIcon.png";

import "./Accordion.css";

const DEFAULT_VALUE_MESSAGE = "Por favor, ingrese el número de línea a consultar.";
const MESSAGE_ALERT_NOT_CLARO_OR_CO = "Por favor, ingrese el número de línea válido para la consulta.";
const MESSAGE_LINE_CO = "Debe ingresar una línea PP o CR para la consulta.";

const AccordionComponent = () => {
  const { number: cellularNumber, invalidPhoneNumber } = useContext(AppContext);
  const { addError } = useContext(DataConsumptionContext);
  const { lineCheck, setTypeLine, setHasErrors, setCodeError} = useContext(LineCheckContext);

  const [openAccordion, setOpenAccordion] = useState(false);
  const [messageAccordion, setMessageAccordion] = useState(DEFAULT_VALUE_MESSAGE);

  const showMessageAriaLabel = useRef(false);

  const { loadingLineData, errorLineData, lineData, callServiceLineData, resetValuesLineData } = useLineDataService(setOpenAccordion);

  const isLineCO = lineCheck.typeLine === "CO";
  const showContent = openAccordion && !loadingLineData && cellularNumber?.length > 0 && lineData !== null;
  const showErrorMessage = isLineCO || (!lineData && openAccordion && !lineCheck.loading && !loadingLineData);
  const shouldFetchLineData = !lineCheck.hasErrors && !isLineCO && !lineCheck.loading && openAccordion && !lineData && cellularNumber?.length > 0;
  const showMessageAccordion =  invalidPhoneNumber.length > 0 && invalidPhoneNumber.length < 8 ? MESSAGE_LINE_CO : DEFAULT_VALUE_MESSAGE; 
  const messageAriaControl = showErrorMessage ? "alertEnterLineNumber" : "lineData";

  const ariaLabelAccordion = () => {
    let ariaLabel = {};

    if(loadingLineData){
      ariaLabel = {"aria-label": "Cargando información de la línea"};
    }else if(showErrorMessage){
      ariaLabel = {"aria-label": `${messageAccordion}`};
    }
    return ariaLabel;
  }

  const resetState = () => {
    resetValuesLineData();
    setCodeError("");
    setTypeLine("");
    setHasErrors(false);
    setOpenAccordion(false);
    setMessageAccordion(DEFAULT_VALUE_MESSAGE);
  }

  useEffect(() => {
    setMessageAccordion(showMessageAccordion);
  },[invalidPhoneNumber])

  useEffect(() => {
    subscribe("focusableInputLine", resetState);
    return () => {
      unsubscribe("focusableInputLine", resetState)
    };
  },[])

  useEffect(() => {
    if(shouldFetchLineData){
      callServiceLineData();
    }
  }, [openAccordion, lineCheck.loading]);

  useEffect(() => {
    if(openAccordion && isLineCO){  
      setMessageAccordion(MESSAGE_LINE_CO)
      addError({
        type: "closeable",
        title: "Número de línea",
        subtitle: MESSAGE_ALERT_NOT_CLARO_OR_CO,
      }); 
    }   
  }, [lineCheck.typeLine, openAccordion]);

  useEffect(() => {
    if(openAccordion && lineCheck.hasErrors && !isLineCO){
      setMessageAccordion(MESSAGE_LINE_CO)
    }
  },[lineCheck.hasErrors, openAccordion]);

  const handleClickLineCheck = () => {
    setOpenAccordion((prevOpen) => {
      showMessageAriaLabel.current = !prevOpen;
      return !prevOpen;
    });
  }

  return (
    <div className="accordion">
      <AccordionHeader
        handleOpenAccordion={handleClickLineCheck}
        openAccordion={openAccordion}
        ariaControl={messageAriaControl}
      />
      <div
        className="accordion-body"
        role="region"
        tabIndex={0}
        aria-busy={loadingLineData ? "true" : "false"}
        {...ariaLabelAccordion()}
        style={{
          position: "relative",
          overflow: "hidden",
          transition: "max-height .3s ease-in-out, visibility 1s",
          maxHeight: openAccordion ? "10000px" : 0,
          visibility: openAccordion ? "visible" : "hidden",
        }}
      >
      
        {(loadingLineData || lineCheck.loading) && (
          <div {...(lineData !== null ? {"aria-label":"Cargando los datos de la línea."} : {})} tabIndex={0} data-testid="accordion-content-loading" className="spinner-acordion">
            <Spinner />
          </div>
        )}
        {showErrorMessage && (
          <div
            aria-labelledby="accordion-header"
            id={messageAriaControl}
            className="container-alert-message"
          >
            <img
              src={warningIcon}
              width={68}
              alt="Advertencia"
              style={{ marginBottom: 10 }}
            />
            <div className="content-alert-message">
              <p className="alert-message">{messageAccordion}</p>
            </div>
          </div>
        )}
        {showContent && (
          <section aria-labelledby="accordion-header" id={messageAriaControl}>
            <BalancesSection balance={lineData.balance} />
            <LineStatesSection condition={lineData.condition} />
            <BasicPillsContainer registers={lineData.registers} />
          </section>
        )}
      </div>
    </div>
  );
};

export default AccordionComponent;
