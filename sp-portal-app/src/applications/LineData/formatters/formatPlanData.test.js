import { formatPlanData } from "./formatPlanData";
import { formatDate } from "utils/formatters";

jest.mock("../../../utils/formatters", () => ({
  formatDate: jest.fn(),
}));

describe("formatPlanData", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should format plan data correctly", () => {
    const condition = {
      profileId: {
        concat: "1418-A018C",
        id: "1418",
        description: "A018C",
      },
      promoPlus: true,
      lastUsed: "2023-06-01 00:00:00.00 -0300",
    };
    formatDate.mockReturnValue("01/06/2023");

    const result = formatPlanData({ condition });

    expect(result).toEqual([
      {
        title: "Plan",
        description: "1418-A018C",
      },
      {
        title: "Promo Plus",
        description: "Habilitado",
      },
      {
        title: "Último uso",
        description: "01/06/2023",
      },
    ]);
  });

  it("it should show promo plus as disabled", () => {
    const condition = {
      promoPlus: false,
    };

    const result = formatPlanData({ condition });

    expect(result).toEqual([
      {
        title: "Promo Plus",
        description: "Inhabilitado",
      },
    ]);
  });

  it("It should return an empty array since it is not supplied with any arguments.", () => {
    const result = formatPlanData({ condition: {} });

    expect(result).toEqual([]);
  });
});
