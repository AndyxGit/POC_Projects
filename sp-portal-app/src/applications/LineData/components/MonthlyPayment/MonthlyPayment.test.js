import React from "react";
import { screen } from "@testing-library/react";
import MonthlyPayment from ".";
import { AppContext } from "Context";
import { render } from "utils/testUtils";

describe("MonthlyPayment", () => {
  let dataMonthlyPayment;
  let providerProps;

  beforeEach(() => {
    jest.clearAllMocks();

    dataMonthlyPayment = {
      amount: 1000,
      expiration: "2023-06-01 00:00:00.00 -0300",
      availablePercentage: "50%",
      consumedPercentage: "50%",
      available: 500,
      consumed: 500,
    };

    providerProps = {
      value: {
        country: {
          value: "ar",
        },
      },
    };
  });

    it("should render null when data are not provided", () => {
    const { container } = render(<MonthlyPayment />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
      ],
    });
    expect(container.firstChild).toBeNull();
  });

  it("must correctly display the data provided when the line is from Argentina", () => {

    render(<MonthlyPayment data={dataMonthlyPayment} />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
      ],
    });
    const expiration = screen.getByText(
      `Vto. ${dataMonthlyPayment.expiration}`
    );
    const available = screen.getByText(/Disponible/i);
    const consumption = screen.getByText(/Consumo/i);
    const monthlyPaymentWrapper = screen.getByTestId("monthly-payment");

    const nextElementOfAvailable = available.nextElementSibling;
    const valueAvailable = nextElementOfAvailable.textContent;

    const nextElementOfConsumption = consumption.nextElementSibling;
    const valueConsumption = nextElementOfConsumption.textContent;

    expect(valueAvailable).toBe(`$${dataMonthlyPayment.available}`);
    expect(valueConsumption).toBe(`$${dataMonthlyPayment.consumed}`);
    expect(monthlyPaymentWrapper.textContent).toBe(`$${1000}`);
    expect(expiration).toBeInTheDocument();
  });

  it("It should display the line in the separator based on the percentage provided.", () => {
    render(<MonthlyPayment data={dataMonthlyPayment} />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
      ],
    });

    const hrElements = screen.getAllByRole("separator");

    expect(hrElements[0]).toHaveStyle({ width: "50%" });
    expect(hrElements[1]).toHaveStyle({ width: "50%" });
  });

  it("It should show empty if the expiration date is not provided.", () => {

    dataMonthlyPayment.expiration = "";

    render(<MonthlyPayment data={dataMonthlyPayment} />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
      ],
    });

    const expirationElement = screen.queryByText(/Vto./i);
    expect(expirationElement).not.toBeInTheDocument();
  });


  it("It should show the amount with the sign of the py currency", () => {

    providerProps.value.country.value = "py";

    render(<MonthlyPayment data={dataMonthlyPayment} />, {
      contexts: [{ provider: AppContext.Provider, props: providerProps }],
    });

    const monthlyPaymentWrapper = screen.getByTestId("monthly-payment");

    expect(monthlyPaymentWrapper.textContent).toBe(`Gs${1000}`);
  });
});
