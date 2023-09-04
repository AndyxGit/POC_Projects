import { screen } from "@testing-library/react";
import { render } from "utils/testUtils";
import TotalBalance from ".";
import { AppContext } from "Context";

describe("TotalBalance", () => {
  let providerProps;

  beforeEach(() => {
    jest.clearAllMocks();
    providerProps = {
      value: {
        country: {
          value: "ar",
        },
      },
    };
  });

  it("It should display the component correctly", () => {
    render(<TotalBalance amount={""} />, {
      contexts: [{ provider: AppContext.Provider, props: providerProps }],
    });
    const button = screen.getByText(/Saldo total disponible/i);

    expect(button).toBeInTheDocument();
  });

  it("should correctly display the total available balance", () => {
    const amount = "500";
    render(<TotalBalance amount={amount} />, {
      contexts: [{ provider: AppContext.Provider, props: providerProps }],
    });

    const findAmount = screen.getByText(`$${amount}`);

    expect(findAmount).toBeInTheDocument();
  });

  
  it("It should show the amount with the sign of the py currency", () => {
    const amount = "1500";
    providerProps.value.country.value = "py";

    render(<TotalBalance amount={amount} />, {
      contexts: [{ provider: AppContext.Provider, props: providerProps }],
    });

    const monthlyPaymentWrapper = screen.getByText(`Gs${amount}`)
    expect(monthlyPaymentWrapper).toBeInTheDocument();
  });
});
