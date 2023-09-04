import React from "react";

import './BorderBottom.css'

const BorderBottom = ({ backgroundColor }) => {
  const root = document.querySelector(':root');

  const blueColor = getComputedStyle(root);

  return (
    <div data-testid="border-bottom" className='border-bottom' style={{ backgroundColor: backgroundColor ?? blueColor.getPropertyValue('--institutional-blue') }} />
  );
};

export default BorderBottom;
