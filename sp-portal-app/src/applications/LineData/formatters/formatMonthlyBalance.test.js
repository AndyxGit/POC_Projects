import { formatMonthlyBalance } from "./formatMonthlyBalance";
import { formatAmount, formatDate } from "utils/formatters";
import { calculatePercentage } from "utils/math";

jest.mock("../../../utils/formatters", () => ({
  formatAmount: jest.fn(),
  formatDate: jest.fn(),
}));

jest.mock("../../../utils/math", () => ({
  calculatePercentage: jest.fn(),
}));

describe("formatMonthlyBalance", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should format monthly balance correctly", () => {
    const monthlyPayment = {
      amount: 1000,
      consumed: 500,
      expiration: "2023-06-01 00:00:00.00 -0300",
      available: 500,
    };
    formatAmount.mockReturnValueOnce("1,000.00");
    formatAmount.mockReturnValueOnce("500.00");
    formatAmount.mockReturnValueOnce("500.00");

    formatDate.mockReturnValueOnce("01/06/2023");

    calculatePercentage.mockReturnValueOnce(50);
    calculatePercentage.mockReturnValueOnce(50);

    const result = formatMonthlyBalance({ monthlyPayment });

    expect(result).toEqual({
      amount: "1,000.00",
      expiration: "01/06/2023",
      availablePercentage: "50%",
      consumedPercentage: "50%",
      available: "500.00",
      consumed: "500.00",
    });
  });
  
});
