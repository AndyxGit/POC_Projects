import React, { useContext } from "react";
import { AppContext } from "Context";
import { formatDateToLongString } from "utils/formatters";
import { getCurrencyName, getCurrencySign } from "utils/generals";

import "./MonthlyPayment.css";

const MonthlyPayment = ({ data }) => {
  const { country : { value } } = useContext(AppContext);

  return (
    <>
      {data ? (
        <div tabIndex={0} className="monthly-payment-container">
          <p className="subtitle">Abono mensual</p>
          <div className="amount-expiration-container"> 
            <p data-testid="monthly-payment" aria-label={`${data.amount} ${getCurrencyName(value)}`} className="initials">{`${getCurrencySign(value)}${data.amount}`}</p>
            <p aria-label={`Fecha de vencimiento ${formatDateToLongString(data.expiration)}`}  className="body-2 color-gray-2">{data.expiration.length !== 0 ? `Vto. ${data.expiration}` : ""}</p>
          </div>
          <div className="percent-container" style={{ width: "100%" }}>
            <hr style={{ width: data.availablePercentage }} />
            <hr style={{ width: data.consumedPercentage }} />
          </div>
          <div className="footer">
            <div className="footer-item">
              <p className="body-1-semibold color-green-base">Disponible</p>                       
              <p aria-label={`${data.available} ${getCurrencyName(value)}`} className="color-gray-2">{`${getCurrencySign(value)}${data.available}`}</p>
            </div>
            <div className="footer-item">
              <p className="body-1-semibold color-orange-base">Consumo</p>   
              <p aria-label={`${data.consumed} ${getCurrencyName(value)} `} className="color-gray-2">{`${getCurrencySign(value)}${data.consumed}`}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MonthlyPayment;
