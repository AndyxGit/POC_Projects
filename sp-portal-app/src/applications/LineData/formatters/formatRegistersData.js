import { formatDate } from "utils/formatters";

export const formatRegistersData = ({ registers }) => {
  const formattedData = Object.entries(registers).map(([k, value]) => {
    switch (k) {
      case "creation":
        return {
          title: "Creación",
          date: formatDate(value, "DD/MM/YYYY"),
        };
      case "lastRecharge":
        return {
          title: "Última recarga",
          date: formatDate(value, "DD/MM/YYYY"),
        };
      case "suspended":
        return {
          title: "Suspensión",
          date: formatDate(value, "DD/MM/YYYY"),
        };
      case "cancelled":
        return {
          title: "Cancelación",
          date: formatDate(value, "DD/MM/YYYY"),
        };
      case "expiration":
        return {
          title: "Caducidad",
          date: formatDate(value, "DD/MM/YYYY"),
        };
    }
  });
  return formattedData;
};
