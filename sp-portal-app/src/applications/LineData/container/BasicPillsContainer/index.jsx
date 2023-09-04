import React from "react";
import { formatRegistersData } from "../../formatters/formatRegistersData";
import { BasicPillInfo } from "applications/LineData/components";

import './BasicPillsContainer.css'

const BasicPillsContainer = ({ registers }) => {
  const registersData = formatRegistersData({ registers });

  return (
    <div className="line-data-footer">
      {registersData?.map((registerDataItem, index) => (
        <BasicPillInfo
          key={`${registerDataItem.title}_${index}`}
          title={registerDataItem.title}
          date={registerDataItem.date}
        />
      ))}
    </div>
  );
};

export default BasicPillsContainer;
