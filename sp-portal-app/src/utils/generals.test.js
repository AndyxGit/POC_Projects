import { deepClone, getCurrencyName, getCurrencySign } from "./generals";

describe("Currency Utils", () => {
  describe("getCurrencyName", () => {
    it("should return 'Guaraníes' for Paraguay", () => {
      const countryPy = "py";
      const currencyName = getCurrencyName(countryPy);
      expect(currencyName).toBe("Guaraníes");
    });

    it("should return 'Pesos' for other countries", () => {
      const currencyName = getCurrencyName("otherCountry");
      expect(currencyName).toBe("Pesos");
    });
  });

  describe("getCurrencySign", () => {
    it("should return 'Gs' for Paraguay", () => {
      const countryPy = "py";
      const currencySign = getCurrencySign(countryPy);
      expect(currencySign).toBe("Gs");
    });

    it("should return '$' for other countries", () => {
      const currencySign = getCurrencySign("otherCountry");
      expect(currencySign).toBe("$");
    });
  });
});
