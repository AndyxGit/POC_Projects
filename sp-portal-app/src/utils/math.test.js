import { calculatePercentage } from "./math";

describe("calculatePercentage", () => {
  it("should return 0 when total is 0", () => {
    expect(calculatePercentage(100, 0)).toBe(50);
  });

  it("should calculate percentage correctly", () => {
    expect(calculatePercentage(50, 100)).toBe(50);
    expect(calculatePercentage(25, 50)).toBe(50);
    expect(calculatePercentage(33.33, 100)).toBeCloseTo(33.33);
    expect(calculatePercentage(1, 3)).toBeCloseTo(33.33);
  });
});
