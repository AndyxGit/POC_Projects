import { formatAmount, formatDate, fomatStrCase } from "./formatters";

describe("formatDate", () => {
  it("should format a given date in a custom format", () => {
    const date = "2023-06-01 00:00:00.00 -0300";
    const formatLike = "DD/MM/YYYY";
    expect(formatDate(date, formatLike)).toBe("01/06/2023");
  });

  it("should return an empty string if the date is not provided", () => {
    expect(formatDate("", "DD/MM/YYYY")).toBe("");
  });
});

describe("fomatStrCase", () => {
  it("should format the first letter of a given string to uppercase", () => {
    expect(fomatStrCase("hello world")).toBe("Hello world");
    expect(fomatStrCase("TESTING")).toBe("Testing");
  });
});
