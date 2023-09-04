import { fomatStrCase, formatDate } from "utils/formatters";

export const formatLineStates = ({ condition }) => {
  const lineStatesFiltered = Object.fromEntries(
    Object.entries(condition).filter(
      ([k]) =>
        k === "currentStatus" ||
        k === "lastStatus" ||
        k === "change" ||
        k === "serviceStatus"
    )
  );

  const lineStatesFormatted = Object.entries(lineStatesFiltered).map(
    ([k, value]) => {
      switch (k) {
        case "currentStatus":
          const objCurrentStatus = {
            title: "Actual",
            description: fomatStrCase(value.description),
            id: value.id,
          };
          if (value.id.toLowerCase() === "in") {
            objCurrentStatus.tooltipDescription = (
              <>
                <div style={{ display: "flex" }}>
                  Estado en la base de datos:
                  <p
                    style={{ marginLeft: 4, marginTop: 0, marginBottom: 0 }}
                    className={
                      condition.pcePcsActual.description.toLowerCase() === "activo"
                        ? "color-green-base"
                        : ""
                    }
                  >
                    {fomatStrCase(condition.pcePcsActual.description)}
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  Estado en la plataforma:
                  <p
                    style={{ marginLeft: 4, marginTop: 0, marginBottom: 0 }}
                    className={
                      condition.accountStatus.description.toLowerCase() === "activo"
                        ? "color-green-base"
                        : ""
                    }
                  >
                    {fomatStrCase(condition.accountStatus.description)}
                  </p>
                </div>
              </>
            );
          }
          return objCurrentStatus;
        case "lastStatus":
          return {
            title: "Anterior",
            description: fomatStrCase(value.description),
          };
        case "change":
          return {
            title: "Cambio de estado",
            description: formatDate(value, "DD/MM/YYYY"),
          };
        case "serviceStatus":
          const objServiceStatus = {
            title: "Del servicio",
            description: fomatStrCase(value.firstWordDescription),
          };

          if (value.firstWordDescription.toLowerCase() === "suspendido") {
            objServiceStatus.tooltipDescription = fomatStrCase(
              value.description
            );
          }
          return objServiceStatus;
      }
    }
  );

  return lineStatesFormatted;
};
