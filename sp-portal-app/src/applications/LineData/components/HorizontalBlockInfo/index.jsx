import React from "react";
import Icon from "@mdi/react";
import { mdiInformation } from "@mdi/js";
import StyledTooltip from "../StyledTooltip";

import { formatDateToLongString, isDateValid } from "utils/formatters";

import "./HorizontalBlockInfo.css";

const HorizontalBlockInfo = ({ items }) => {
  const colorMap = {
    AC: "color-green-base",
    IN: "color-base-red",
    CN: "color-base-red",
  };

  const formatLabel = (item) => {
    const { title, description, tooltipDescription } = item;

    if (isDateValid(description)) {
      return formatDateToLongString(description);
    }

    if (title.toLowerCase() === "actual" && tooltipDescription) {
      const databaseStatus = getDatabaseStatus(tooltipDescription);
      const platformStatus = getPlatformStatus(tooltipDescription);

      return `${description}, Estado en la base de datos: ${databaseStatus}, Estado en la plataforma: ${platformStatus}`;
    }

    if (title.toLowerCase() === "del servicio" && tooltipDescription) {
      return `${description}, ${tooltipDescription}`;
    }

    return `${description}`;
  };

  const getDatabaseStatus = (tooltipDescription) => {
    return (
      tooltipDescription?.props?.children?.[0]?.props?.children?.[1]?.props
        ?.children || ""
    );
  };

  const getPlatformStatus = (tooltipDescription) => {
    return (
      tooltipDescription?.props?.children?.[1]?.props?.children?.[1]?.props
        ?.children || ""
    );
  };

  return (
    <>
      {items ? (
        <div className="horizontal-block-info-container">
          {items.map((item, index) => (
            <div tabIndex={0} key={`${item.title}_${index}`} className="block-info-item">
              <p className="body-2 color-gray-2">{item.title}</p>
              <p
                aria-label={formatLabel(item)}
                className={`body-1-semibold description ${colorMap[item.id] || ""}`}
              >
                {item.description}
                {item.tooltipDescription && (
                  <StyledTooltip title={item.tooltipDescription}>
                    <Icon
                      data-testid={`icon-info-${item.title}`}
                      path={mdiInformation}
                      size={"16px"}
                    />
                  </StyledTooltip>
                )}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default HorizontalBlockInfo;
