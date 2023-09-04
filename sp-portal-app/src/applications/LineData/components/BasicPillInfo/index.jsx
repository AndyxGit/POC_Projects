import React from "react";

import './BasicPillInfo.css'
import { formatDateToLongString } from "utils/formatters";

const BasicPillInfo = ({ title, date }) => (
  <div tabIndex={0} className='basic-pill-info-container'>
    <p className='body-1-semibold'>{title}</p>
    <p aria-label={date ? formatDateToLongString(date) : ""} className='body-1-semibold'>{date}</p>
  </div>
);

export default BasicPillInfo;
