import { formatDate } from "utils/formatters";

export const formatPlanData = ({ condition }) => {
  const planDataFiltered = Object.fromEntries(
    Object.entries(condition).filter(
      ([k]) => k === "profileId" || k === "promoPlus" || k === "lastUsed"
    )
  );

  const lineStatesFormatted = Object.entries(planDataFiltered).map(
    ([k, value]) => {
      switch (k) {
        case "profileId":
          return {
            title: "Plan",
            description: value.concat,
          };
        case "promoPlus":
          return {
            title: "Promo Plus",
            description: value ? "Habilitado" : "Inhabilitado",
          };
        case "lastUsed":
          return {
            title: "Último uso",
            description: formatDate(value, "DD/MM/YYYY"),
          };
      }
    }
  );

  return lineStatesFormatted;
};
