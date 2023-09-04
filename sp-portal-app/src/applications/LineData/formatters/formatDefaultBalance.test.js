import { formatAmount, formatDate } from "utils/formatters";
import { formatDefaultBalance } from "./formatDefaultBalance";

jest.mock("../../../utils/formatters.js", () => ({
  formatAmount: jest.fn(),
  formatDate: jest.fn(),
}));

describe("formatDefaultBalance", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array with the formatted default balance data", () => {
    const mockBalance = {
      rechargePayment: {
        amount: 100,
        expiration: "2023-06-01 00:00:00.00 -0300",
      },
      promotionPayment: {
        amount: 50,
        expiration: "2023-04-12 00:00:00.00 -0300",
      },
      frozenPayment: {
        amount: 25,
        expiration: "2023-02-11 00:00:00.00 -0300",
      },
      otherPayment: {
        amount: 10,
        expiration: "2023-10-08 00:00:00.00 -0300",
      },
    };

    formatAmount.mockReturnValueOnce("100.00");
    formatAmount.mockReturnValueOnce("50.00");
    formatAmount.mockReturnValueOnce("25.00");

    formatDate.mockReturnValueOnce("01/06/2023");
    formatDate.mockReturnValueOnce("12/04/2023");
    formatDate.mockReturnValueOnce("11/02/2023");

    const result = formatDefaultBalance({ balance: mockBalance });

    expect(result).toEqual([
      {
        title: "Saldo de recarga",
        amount: "100.00",
        expiration: "01/06/2023",
      },
      {
        title: "Saldo promocional",
        amount: "50.00",
        expiration: "12/04/2023",
      },
      {
        title: "Saldo congelado",
        amount: "25.00",
        expiration: "11/02/2023",
      },
    ]);

    expect(formatAmount).toHaveBeenCalledTimes(3);

    expect(formatAmount).toHaveBeenCalledWith(100);
    expect(formatAmount).toHaveBeenCalledWith(50);
    expect(formatAmount).toHaveBeenCalledWith(25);

    expect(formatDate).toHaveBeenCalledTimes(3);

    expect(formatDate).toHaveBeenCalledWith(
      "2023-06-01 00:00:00.00 -0300",
      "DD/MM/YYYY"
    );
    expect(formatDate).toHaveBeenCalledWith(
      "2023-04-12 00:00:00.00 -0300",
      "DD/MM/YYYY"
    );
    expect(formatDate).toHaveBeenCalledWith(
      "2023-02-11 00:00:00.00 -0300",
      "DD/MM/YYYY"
    );
  });

  it("should return an empty array when no default balance data is present", () => {
    const mockBalance = {
      otherPayment: {
        amount: 10,
        expiration: "2022-04-01",
      },
    };

    const result = formatDefaultBalance({ balance: mockBalance });

    expect(result).toEqual([]);
  });
});
