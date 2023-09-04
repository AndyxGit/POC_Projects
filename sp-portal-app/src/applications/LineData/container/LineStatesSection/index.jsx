import React from "react";
import { formatPlanData } from "../../formatters/formatPlanData";
import { formatLineStates } from "../../formatters/formatLineStates";
import { HorizontalBlockInfo } from "applications/LineData/components";

import "./LineStatesSection.css";

const LineStatesSection = ({ condition }) => {
  const lineStates = formatLineStates({ condition });
  const planData = formatPlanData({ condition });

  return (
    <section
      tabIndex={0}
      aria-label="Información sobre los Estados de la línea"
      className="line-data-container"
    >
      <p id="line-status" className="body-1-semibold title-line-status">
        Estados de la línea
      </p>
      <div className="blocks-info-container">
        <HorizontalBlockInfo items={lineStates} />
        <HorizontalBlockInfo items={planData} />
      </div>
    </section>
  );
};

export default LineStatesSection;
