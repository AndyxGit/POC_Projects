import React from "react";
import { render, screen } from "@testing-library/react";
import { formatDefaultBalance } from "../../formatters/formatDefaultBalance";
import { formatMonthlyBalance } from "../../formatters/formatMonthlyBalance";

import BalancesSection from ".";

const stubMonthlyBalance = {
  amount: 5000,
  expiration: "2023-06-01 00:00:00.00 -0300",
  availablePercentage: `50%`,
  consumedPercentage: `50%`,
  available: 1000,
  consumed: 4000,
};

const stubDefaultBalance = [
  {
    title: "Saldo congelado",
    amount: "5000.00",
    expiration: "2023-06-01 00:00:00.00 -0300",
  },
  {
    title: "Saldo congelado",
    amount: "5000.00",
    expiration: "2023-06-01 00:00:00.00 -0300",
  },
];

const StubBalance = {
  availablePayment: {
    amount: "5000",
  },
};

jest.mock("../../formatters/formatDefaultBalance", () => ({
  formatDefaultBalance: jest.fn(),
}));

jest.mock("../../formatters/formatMonthlyBalance", () => ({
  formatMonthlyBalance: jest.fn(),
}));

jest.mock("../../../../utils/formatters", () => ({
  formatAmount: jest.fn().mockReturnValue("5000.00"),
}));

jest.mock("../../components", () => ({
  __esModule: true,
  TotalBalance: () => <div>Mock component TotalBalance</div>,
  MonthlyPayment: () => <div>Mock component MonthlyPayment</div>,
  DefaultBalance: () => <div>Mock component DefaultBalance</div>,
}));

describe("BalancesSection", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should render correctly with mocked dependencies", async () => {
    formatDefaultBalance.mockReturnValue(stubDefaultBalance);
    formatMonthlyBalance.mockReturnValue(stubMonthlyBalance);

    render(<BalancesSection balance={StubBalance} />);

    const textComponenteTotalBalance = screen.getByText(
      /Mock component TotalBalance/i
    );
    const textComponenteDefaultBalance = await screen.findAllByText(
      /Mock component DefaultBalance/i
    );

    expect(textComponenteTotalBalance).toBeInTheDocument();
    expect(textComponenteDefaultBalance).toHaveLength(2);
  });

  it("should display the amount component of your cr line", async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ cbtId: "cr" }));

    formatDefaultBalance.mockReturnValue(stubDefaultBalance);
    formatMonthlyBalance.mockReturnValue(stubMonthlyBalance);

    render(<BalancesSection balance={StubBalance} />);
    const textComponenteMonthlyPayment = screen.queryByText(
      /Mock component MonthlyPayment/i
    );

    expect(textComponenteMonthlyPayment).toBeInTheDocument();
  });

  it("should not display the amount component of your pp line", async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ cbtId: "pp" }));

    formatDefaultBalance.mockReturnValue(stubDefaultBalance);
    formatMonthlyBalance.mockReturnValue(stubMonthlyBalance);

    render(<BalancesSection balance={StubBalance} />);

    const textComponenteMonthlyPayment = screen.queryByText(
      /Mock component MonthlyPayment/i
    );

    expect(textComponenteMonthlyPayment).not.toBeInTheDocument();
  });
});
