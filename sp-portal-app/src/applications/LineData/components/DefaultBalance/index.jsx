import React, { useContext } from "react";
import BorderBottom from "../BorderBottom";
import { formatDateToLongString } from "utils/formatters";
import { AppContext } from "Context";
import { getCurrencyName, getCurrencySign } from "utils/generals";

import './DefaultBalance.css'

const DefaultBalance = ({ title, amount, expiration }) => {
  const { country : { value } } = useContext(AppContext);

  return (
    <div tabIndex={0} className="default-balance-container">
    <div className='data-container'>
      <p className='subtitle'>{title}</p>
      <div className="amount-date-container">
        <p aria-label={`${amount} ${getCurrencyName(value)}`} className='initials'>{`${getCurrencySign(value)}${amount}`}</p>
        <p aria-label={expiration.length !== 0 ? `Fecha de vencimiento ${formatDateToLongString(expiration)}` : ""} className='body-2 color-gray-2'>{expiration.length !== 0 ? `Vto. ${expiration}` : ""}</p>
      </div>
    </div>
    <BorderBottom backgroundColor='#D0D0D0' />
  </div>
  )
}

export default DefaultBalance;
