import React from "react";
import { formatDefaultBalance } from "../../formatters/formatDefaultBalance";
import { formatMonthlyBalance } from "../../formatters/formatMonthlyBalance";
import { formatAmount } from "utils/formatters";
import { DefaultBalance, MonthlyPayment, TotalBalance } from "applications/LineData/components";
import { PLAN } from "../../../../constants";

import "./BalancesSection.css";

const BalancesSection = ({ balance }) => {
  const { amount } = balance.availablePayment;
  const balances = formatDefaultBalance({ balance });
  const monthlyBalance = formatMonthlyBalance({ monthlyPayment: balance.monthlyPayment});

  const lineCheck = localStorage.getItem("lineCheck") ? JSON.parse(localStorage.getItem("lineCheck")) : null
 
  const cbtId = lineCheck && lineCheck.cbtId;

  return (
    <div className="main-data-container">
      <TotalBalance amount={formatAmount(amount)} />
      <div className="monthly-payment-balances-container">
        {cbtId?.toLowerCase() === PLAN.ABONO && (
          <MonthlyPayment data={monthlyBalance} />
        )}
        {balances?.map(({ title, amount, expiration }, index) => (
          <DefaultBalance
            key={`${title}_${index}`}
            title={title}
            amount={amount}
            expiration={expiration}
          />
        ))}
      </div>
    </div>
  );
};

export default BalancesSection;
