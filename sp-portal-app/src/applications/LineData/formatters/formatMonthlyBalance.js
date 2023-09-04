import { formatAmount, formatDate } from "utils/formatters";
import { calculatePercentage } from "utils/math";

export const formatMonthlyBalance = ({ monthlyPayment }) => {
  const { amount, consumed, expiration, available } = monthlyPayment;
  const monthlyBalance = {
    amount: formatAmount(amount),
    expiration: formatDate(expiration, "DD/MM/YYYY"),
    availablePercentage: `${calculatePercentage(available, amount)}%`,
    consumedPercentage: `${calculatePercentage(consumed, amount)}%`,
    available: formatAmount(available),
    consumed: formatAmount(consumed),
  };
  return monthlyBalance;
};
