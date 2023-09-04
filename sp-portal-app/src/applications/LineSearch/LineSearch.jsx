import React, { useState, useContext, useRef } from "react";
import ar from "../../assets/ar.jpg";
import uy from "../../assets/uy.jpg";
import py from "../../assets/py.jpg";
import "./LineSearch.css";
import { AppContext } from "Context";
import { DataConsumptionContext } from "context/DataConsumptionContext";
import { publish } from "../../utils/event";
import { useLineCheckService } from "applications/LineData/hooks/useLineCheckService";

const HEADER_OPTIONS = [
  {
    value: "ar",
    label: (
      <div className="countryOption">
        <img src={ar} width={30} alt="ar" />
        <div className="countryName">AR</div>
      </div>
    ),
  },
  {
    value: "uy",
    label: (
      <div className="countryOption">
        <img src={uy} width={30} alt="uy" />
        <div className="countryName">UY</div>
      </div>
    ),
  },
  {
    value: "py",
    label: (
      <div className="countryOption">
        <img src={py} width={30} alt="py" />
        <div className="countryName">PY</div>
      </div>
    ),
  },
];

export const LineSearch = () => {
  const [inputNumber, setInputNumber] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const isPendingCallLineCheck = useRef(null);
  const eventTriggerType = useRef("onBlur");
  const [messageAlert, setMessageAlert] = useState("Por favor, ingrese el número de línea a consultar.");
  const { setNumber, setCountry, setInvalidPhoneNumber } = useContext(AppContext);
  const { addError, removeError } = useContext(DataConsumptionContext);

  const {resetLineCheck, callServiceLineCheck} = useLineCheckService({inputNumber, inputCountry});

  const getCountry = (phone) => {
    switch (phone.length) {
      case 8:
        setInputCountry(HEADER_OPTIONS[1]);
        break;
      case 9:
        setInputCountry(HEADER_OPTIONS[2]);
        break;
      case 10:
        setInputCountry(HEADER_OPTIONS[0]);
        break;
      default:   
        setInvalidPhoneNumber(phone) 
        if(phone.length > 0){    
          setMessageAlert("Por favor, ingrese el número de línea válido para la consulta.");
        }
        else{    
          setInputCountry("");
        }    
    }
  };

  const handleChange = (e) => {
    if (inputNumber.length < 10) {
      const result = e.replace(/\D/g, "");
      getCountry(result);
      setInputNumber(result);
    }
  };

  const onSave = () => {
    if (inputNumber && inputCountry) {
      setNumber(inputNumber);
      setCountry(inputCountry);
      const phoneData = {
        phone: inputNumber,
        country: inputCountry,
      };
     
      if(!isPendingCallLineCheck.current) {
        callServiceLineCheck();
      }

      localStorage.setItem("phoneData", JSON.stringify(phoneData));
    } else {
      addError({
        type: "closeable",
        title: "Número de línea",
        subtitle: messageAlert,
      });
    
      setMessageAlert("Por favor, ingrese el número de línea a consultar.");
    }
  };

  const reload = (e) => {
   
    if (e.code === "Backspace" || e.code === "Delete") {
      resetLineCheck();
      setInvalidPhoneNumber("");
      setInputNumber("");
      setInputCountry("");
      setNumber("");
      setCountry("");
      removeError();
      isPendingCallLineCheck.current = false;
      eventTriggerType.current = "onBlur";   
      localStorage.clear();
    }
    if (e.code === "Enter" || e.code === "NumpadEnter") { 
      eventTriggerType.current = "enter";
      onSave();
      isPendingCallLineCheck.current = true;
    }
  };

  const reset = () => {
    publish("focusableInputLine", {});
    resetLineCheck();
    setInvalidPhoneNumber("");
    setInputNumber("");
    setInputCountry("");
    setNumber("");
    setCountry("");
    removeError();
    isPendingCallLineCheck.current = false;
    eventTriggerType.current = "onBlur";
    localStorage.clear();
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }} aria-label="pais y número">
      <input 
        tabIndex={20} 
        onKeyDown={(e) => reload(e)} 
        id="searchPhoneInput" 
        onFocus={() => reset()} 
        onBlur={() => {
            if(eventTriggerType.current !== "enter"){
              onSave(); 
              isPendingCallLineCheck.current = true;          
            }
            eventTriggerType.current = "onBlur"
          }    
        }
        name="search" 
        className="search" 
        type="tel" 
        placeholder="Número de Línea" 
        aria-label="Input Número de Línea" 
        value={inputNumber} 
        onChange={(e) => handleChange(e.target.value)} 
      />
      <div
        placeholder="País"
        className="countrySelectStyle"
        name="country"
      >
        {inputCountry.label}
      </div>
    </div>
  );
};
