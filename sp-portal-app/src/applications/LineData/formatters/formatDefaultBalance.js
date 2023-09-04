import { formatAmount, formatDate } from "utils/formatters";

export const formatDefaultBalance = ({ balance }) => {
  const defaultBalanceData = Object.fromEntries(
    Object.entries(balance).filter(
      ([k]) =>
        k === "rechargePayment" ||
        k === "promotionPayment" ||
        k === "frozenPayment"
    )
  );
  const defaultBalanceArray = Object.keys(defaultBalanceData).map((k) => {
    switch (k) {
      case "rechargePayment":
        return {
          title: "Saldo de recarga",
          amount: formatAmount(defaultBalanceData[k].amount),
          expiration: formatDate(
            defaultBalanceData[k].expiration,
            "DD/MM/YYYY"
          ),
        };
      case "promotionPayment":
        return {
          title: "Saldo promocional",
          amount: formatAmount(defaultBalanceData[k].amount),
          expiration: formatDate(
            defaultBalanceData[k].expiration,
            "DD/MM/YYYY"
          ),
        };
      case "frozenPayment":
        return {
          title: "Saldo congelado",
          amount: formatAmount(defaultBalanceData[k].amount),
          expiration: formatDate(
            defaultBalanceData[k].expiration,
            "DD/MM/YYYY"
          ),
        };
    }
  });
  return defaultBalanceArray;
};
