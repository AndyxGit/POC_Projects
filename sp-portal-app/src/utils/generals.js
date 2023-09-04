import { COUNTRY } from "../constants";

export const getCurrencyName = (countryValue) => {
  if (countryValue === COUNTRY.PARAGUAY) {
    return "Guaraníes";
  } 
  return "Pesos";
};

export const getCurrencySign = (countryValue) => {
  if (countryValue === COUNTRY.PARAGUAY) {
    return "Gs"; 
  } 
  return "$";
}