import React from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";

import "./AccordionHeader.css";

const AccordionHeader = ({ handleOpenAccordion, openAccordion, ariaControl }) => {

  const openAccordionWithKey = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {  
      handleOpenAccordion();
    }
  };

  return (
    <div
      role="button"
      aria-label="Datos de la línea"
      className="accordion-header"
      id="accordion-header"
      aria-expanded={openAccordion}
      aria-controls={ariaControl}
      tabIndex={0}
      onClick={handleOpenAccordion} 
      onKeyDown={openAccordionWithKey}
    >
      <p className="subtitle">Datos de la línea</p>
      <Icon
        data-testid="icon-accordion"
        style={{
          cursor:"pointer",
          transform: openAccordion ? "rotate(-180deg)" : "",
          transition: ".2s ease-in-out",
        }}
        path={mdiChevronDown}
        size={1}
      />
    </div>
   
  );
};

export default AccordionHeader;
