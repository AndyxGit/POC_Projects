import { screen } from '@testing-library/react';
import { render } from "utils/testUtils";
import { AppContext } from 'Context';
import DefaultBalance from '.';

describe('DefaultBalance', () => {
  const title = 'Saldo de recarga';
  const amount = '5000';
  const expiration = '10/06/2023';
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

  it('renders title, amount, and expiration correctly', () => {
    render(<DefaultBalance title={title} amount={amount} expiration={expiration} />, {
      contexts: [{ provider: AppContext.Provider, props: providerProps }],
    });

    const titleElement = screen.getByText(title);
    const amountElement = screen.getByText(`$${amount}`);
    const expirationElement = screen.getByText(`Vto. ${expiration}`);

    expect(titleElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();
    expect(expirationElement).toBeInTheDocument();
  });

  it("It should show empty if the expiration date is not provided.", () => {
    const expirationEmpty = '';

    render(<DefaultBalance title={title} amount={amount} expiration={expirationEmpty} />, {
      contexts: [{ provider: AppContext.Provider, props: providerProps }],
    });

    const expirationElement = screen.queryByText(/Vto./i);
    expect(expirationElement).not.toBeInTheDocument();
  });

  it("It should show the amount with the sign of the py currency", () => {
    const amount = "1250";
    providerProps.value.country.value = "py";

    render(<DefaultBalance title={title} amount={amount} expiration={expiration} />, {
      contexts: [{ provider: AppContext.Provider, props: providerProps }],
    });

    const monthlyPaymentWrapper = screen.getByText(`Gs${1250}`)
    expect(monthlyPaymentWrapper).toBeInTheDocument();
  });
});