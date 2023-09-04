import React, { useContext } from "react";
import BorderBottom from "../BorderBottom";
import { AppContext } from "Context";
import { getCurrencyName, getCurrencySign } from "utils/generals";

import './TotalBalance.css'

const TotalBalance = ({ amount }) => {
  const { country : { value } } = useContext(AppContext);

  return (
    <div tabIndex={0} className='total-balance-container'>
      <div className='header subtitle'>Saldo total disponible</div>
      <p aria-label={`${amount} ${getCurrencyName(value)}`} className='total initials'>{`${getCurrencySign(value)}${amount}`}</p>
      <BorderBottom />
    </div>
  )
}

export default TotalBalance;

