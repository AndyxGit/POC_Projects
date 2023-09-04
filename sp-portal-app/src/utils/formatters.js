import moment from "moment";
import { round } from "lodash";

export const formatAmount = (amount) => {
  const number = Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(round(Math.abs(amount), 2)).toFixed(2));
  return number;
};

export const formatDate = (date, formatLike) => {
  if (date.length !== 0) {
    return moment(date, "YYYY-MM-DD HH:mm:ss.SS Z").format(formatLike);
  }
  return "";
};

export const fomatStrCase = (str) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};
export const formatDateToLongString = (dateString) => {
  const date = moment(dateString, 'DD/MM/YYYY');
  return date.format('DD [de] MMMM [de] YYYY');
}

export const isDateValid = (dateString) => {
  const date = moment(dateString, 'DD/MM/YYYY');
  return date.isValid();
}
