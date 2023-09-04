import React from "react";
import _ from 'lodash';
import { screen, waitFor } from "@testing-library/react";
import { axiosInstance } from "../../../../services/interceptor";
import { fakeLocalStorage, render } from "../../../../utils/testUtils";
import { AppContext } from "Context";
import { LineCheckContext } from "context/LineCheckContext";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import AccordionComponent from ".";
import DataConsumptionContextProvider from "context/DataConsumptionContext";

jest.mock("../../../../services/interceptor", () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

jest.mock("../../container/BalancesSection", () => ({
  __esModule: true,
  default: () => <div>Mock component BalancesSection</div>,
}));

jest.mock("../../container/BasicPillsContainer", () => ({
  __esModule: true,
  default: () => <div>Mock component BasicPillsContainer</div>,
}));

jest.mock("../../container/LineStatesSection", () => ({
  __esModule: true,
  default: () => <div>Mock component LineStatesSection</div>,
}));

let responseLineData = {
  serviceDetails: {
    error: "OK",
    result: "0",
    level: "SUCCESS",
  },
  format: {
    date: "yyyy-MM-dd HH:mm:ss.SS Z",
    currency: "$",
  },
  balance: {
    availablePayment: {
      amount: 0.0,
    },
    rechargePayment: {
      amount: 0.0,
      expiration: "2023-05-04 11:31:00.00 -0300",
    },
    promotionPayment: {
      amount: 0.0,
      expiration: "2023-05-04 11:31:00.00 -0300",
    },
    frozenPayment: {
      amount: 0.0,
      expiration: "",
    },
    monthlyPayment: {
      amount: 20.0,
      expiration: "2023-06-01 00:00:00.00 -0300",
      available: 0.0,
      consumed: 20.0,
    },
  },
  condition: {
    currentStatus: {
      id: "AC",
      description: "ACTIVO",
    },
    lastStatus: {
      id: "AC",
      description: "ACTIVO",
    },
    accountStatus: {
      id: "2",
      description: "ACTIVO",
    },
    pcePcsActual: {
      id: "AC",
      description: "ACTIVO",
    },
    serviceStatus: {
      id: "1",
      description: "ACTIVO",
      firstWordDescription: "ACTIVO",
    },
    profileId: {
      id: "1048",
      description: "ACI55",
      concat: "1048 - ACI55",
    },
    change: "2023-05-04 11:31:39.00 -0300",
    promoPlus: true,
    lastUsed: "2023-05-04 11:31:39.00 -0300",
  },
  registers: {
    creation: "2023-05-04 11:31:39.00 -0300",
    lastRecharge: "",
    suspended: "2024-02-28 00:00:00.00 -0300",
    cancelled: "2024-02-28 00:00:00.00 -0300",
    expiration: "2023-05-04 11:31:00.00 -0300",
  },
};

describe("AccordionComponent", () => {

  const providerProps = {
    value: {
      number: "3512072757",
      country : { value: "ar" },
      invalidPhoneNumber: ""
    }, 
  };

  const dataLineCheck = {
    billNumber: "3512072757",
    cbtId: "CR",
    cellularNumber: "3512072757",
    cluType: "CPP",
    msisdn: "5493512072757",
    prefix: "549",
    rplId: "ACI55",
    stgId: "AH",
  };

  const lineCheck = {
    codeError: "",
    hasErrors: false,
    loading: false,
    typeLine: "",
  }

  const providerPropsLineCheck = {
    value: {
      lineCheck, 
      setTypeLine : () => {}, 
      setHasErrors: () => {}, 
      setCodeError: () => {}, 
      setHasErrors: () => {}
    }
  }

  const dispatchEventDefault = async (eventParam, dataEvent) => {
    await act( async() => {
      const event = new CustomEvent(eventParam, dataEvent);
      window.document.dispatchEvent(event);
    });
  }

  const clickButtonHeaderAccordion = () => {
    const buttonHeaderAccordion = screen.getByRole("button", { name: /Datos de la línea/i });
    userEvent.click(buttonHeaderAccordion);
  }

  const loadingAndContentAccordionNotDocument = async (loading, content) => {
    await act( async() => {
      expect(content).not.toBeInTheDocument();
    });
    expect(loading).not.toBeInTheDocument();
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: fakeLocalStorage(),
    });

    const valuePhoneData = JSON.stringify({
      phone: "3512072757",
      country: { value: "ar", label: "" },
    });

    window.localStorage.setItem("phoneData", valuePhoneData);
    window.localStorage.setItem("lineCheck", JSON.stringify(dataLineCheck));
  });

  it("should render correctly with mocked dependencies", () => {
    const providerPropsUndefined = {
      value: {
        number: undefined,
        invalidPhoneNumber:""
      },
    };

    axiosInstance.get.mockResolvedValueOnce({ data: responseLineData });

    render(<AccordionComponent />, {
      contexts: [
        { provider: AppContext.Provider, props: providerPropsUndefined },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
      ],
    });

    const BalancesSection = screen.queryByText(/Mock component BalancesSection/i);
    const LineStatesSection = screen.queryByText(/Mock component LineStatesSection/i);
    const BasicPillsContainer = screen.queryByText(/Mock component BasicPillsContainer/i);
    const buttonHeaderAccordion = screen.getByRole("button", {name: /Datos de la línea/i});

    expect(buttonHeaderAccordion).toBeInTheDocument();
    expect(BalancesSection).not.toBeInTheDocument();
    expect(BasicPillsContainer).not.toBeInTheDocument();
    expect(LineStatesSection).not.toBeInTheDocument();
  });

  it("Should display the Please enter line number information when the accordion is clicked without a line number", async () => {
    const providerPropsUndefined = {
      value: {
        number: undefined,
        invalidPhoneNumber:""
      },
    };

    axiosInstance.get.mockResolvedValueOnce({
      data: responseLineData,
    });

    render(<AccordionComponent />, {
      contexts: [
        { provider: AppContext.Provider, props: providerPropsUndefined },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
      ],
    });

    clickButtonHeaderAccordion();

    const alert = await screen.findByText(/Por favor, ingrese el número de línea a consultar./i);

    expect(alert).toBeInTheDocument();
  });


  it("Should display line information when the accordion is clicked and a line number is entered", async () => {
    axiosInstance.get.mockResolvedValueOnce({
      data: responseLineData,
    });

    render(<AccordionComponent />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
      ],
    });

    clickButtonHeaderAccordion();

    const BalancesSection =  await screen.findByText(/Mock component BalancesSection/i);
    const LineStatesSection =  await screen.findByText(/Mock component LineStatesSection/i);
    const BasicPillsContainer =  await screen.findByText(/Mock component BasicPillsContainer/i);

    expect(BalancesSection).toBeInTheDocument();
    expect(BasicPillsContainer).toBeInTheDocument();
    expect(LineStatesSection).toBeInTheDocument();
  });


  it("should show the spinner while the call to the lineCheck service is processed", async () => {

    const providerPropsLineCheckClone = _.cloneDeep(providerPropsLineCheck);

    providerPropsLineCheckClone.value.lineCheck.loading = true;

    render(<AccordionComponent />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheckClone }
      ],
    });

    const loading =  await screen.findByTestId("accordion-content-loading");

    const BalancesSection = screen.queryByText(/Mock component BalancesSection/i);
    const LineStatesSection = screen.queryByText(/Mock component LineStatesSection/i);
    const BasicPillsContainer = screen.queryByText(/Mock component BasicPillsContainer/i);

    expect(loading).toBeInTheDocument();
    expect(BalancesSection).not.toBeInTheDocument();
    expect(BasicPillsContainer).not.toBeInTheDocument();
    expect(LineStatesSection).not.toBeInTheDocument();
  }); 

  it("It should not show the content of the line because there was an error in the lineCheck service", async () => {

    const providerPropsLineCheckClone = _.cloneDeep(providerPropsLineCheck);

    providerPropsLineCheckClone.value.lineCheck.hasErrors = true;

    render(<AccordionComponent />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheckClone }
      ],
    });

    const loading = screen.queryByTestId("accordion-content-loading");
    clickButtonHeaderAccordion();
    const BalancesSection = screen.queryByText(/Mock component BalancesSection/i);
    await loadingAndContentAccordionNotDocument(loading, BalancesSection);

  });
  

  it("should close the accordion when an error occurs in the service", async () => {

    axiosInstance.get.mockRejectedValueOnce(new Error("Request failed"));

    render(<AccordionComponent />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
      ],
    });

    const loading = screen.queryByTestId("accordion-content-loading");
    const BalancesSection = screen.queryByText(/Mock component BalancesSection/i);
    clickButtonHeaderAccordion();
    await loadingAndContentAccordionNotDocument(loading, BalancesSection);

  }); 

  it("It should show everything ok although the line data answer I have a status level in warning", async () => {

    const responseCloneLineData = _.cloneDeep(responseLineData);

    responseCloneLineData.serviceDetails.error = "WARNING";
    responseCloneLineData.serviceDetails.level = "WARNING";

    axiosInstance.get.mockResolvedValueOnce({ data: responseCloneLineData });

    render(<AccordionComponent />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
      ],
    });

    const loading = screen.queryByTestId("accordion-content-loading");
    const BalancesSection = screen.queryByText(/Mock component BalancesSection/i);
    clickButtonHeaderAccordion();
    await loadingAndContentAccordionNotDocument(loading, BalancesSection);

  }); 

   it("should close the accordion When the lineCheck service has the level in error", async () => {

    const responseLineDataError = {
      serviceDetails: {
        error: "ERROR",
        result: "0",
        level: "ERROR",
      }
    }

    axiosInstance.get.mockResolvedValueOnce({ data: responseLineDataError });

    render(<AccordionComponent />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
      ],
    });

    const loading = screen.queryByTestId("accordion-content-loading");
    const BalancesSection = screen.queryByText(/Mock component BalancesSection/i);
    clickButtonHeaderAccordion();
    await loadingAndContentAccordionNotDocument(loading, BalancesSection);

  }); 


  it("The accordion should close when the line number input is focused", async () => {
    
    const responseLineDataError = {
      serviceDetails: {
        error: "ERROR",
        result: "0",
        level: "ERROR",
      }
    }
  
    axiosInstance.get.mockResolvedValueOnce({ data: responseLineDataError });

    render(<AccordionComponent />, {
      contexts: [
        { provider: AppContext.Provider, props: providerProps },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
      ],
    });

    await dispatchEventDefault("focusableInputLine", {} );
    const loading = screen.queryByTestId("accordion-content-loading");
    const BalancesSection = screen.queryByText(/Mock component BalancesSection/i);
    clickButtonHeaderAccordion();
    await loadingAndContentAccordionNotDocument(loading, BalancesSection);

  }); 


  describe("When the line number is not empty but does not correspond to a valid line", () => {

    it("The message ${Debe ingresar una línea PP o CR para la consulta} should be displayed when the line number is not empty but does not correspond to a valid line", async () => {

      const providerProps = {
        value: {
          number: undefined,
          country : { value: "ar" },
          invalidPhoneNumber: "123"
        }, 
      };

      render(<AccordionComponent />, {
        contexts: [
          { provider: AppContext.Provider, props: providerProps },
          { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
        ],
      });

      clickButtonHeaderAccordion();
      const message = await screen.findByText(/Debe ingresar una línea PP o CR para la consulta./i); 
      expect(message).toBeInTheDocument()
  
    }); 

    it("The message ${Por favor, ingrese el número de línea a consultar} should be displayed when the line number is empty", async () => {

      const providerProps = {
        value: {
          number: undefined,
          country : { value: "ar" },
          invalidPhoneNumber: ""
        }, 
      };

      render(<AccordionComponent />, {
        contexts: [
          { provider: AppContext.Provider, props: providerProps },
          { provider: LineCheckContext.Provider, props: providerPropsLineCheck }
        ],
      });

      clickButtonHeaderAccordion();
      const message = await screen.findByText(/Por favor, ingrese el número de línea a consultar./i);
      expect(message).toBeInTheDocument()
  
    }); 


    it("The message ${Debe ingresar una línea PP o CR para la consulta} should be displayed when the line number is type CO", async () => {
      const providerPropsLineCheckClone = _.cloneDeep(providerPropsLineCheck);

      providerPropsLineCheckClone.value.lineCheck.typeLine = "CO";
      
      const providerProps = {
        value: {
          number: "1163456789",
          country : { value: "ar" },
          invalidPhoneNumber: "1163456789"
        }, 
      };

      render(<AccordionComponent />, {
        contexts: [
          { provider: AppContext.Provider, props: providerProps },
          { provider: LineCheckContext.Provider, props: providerPropsLineCheckClone }
        ],
      });
  
      clickButtonHeaderAccordion();
      const message = await screen.findByText(/Debe ingresar una línea PP o CR para la consulta./i);
      expect(message).toBeInTheDocument();
  
    });
    
    it("should show the alert with the message ${} when the line is type CO", async () => {
      const providerPropsLineCheckClone = _.cloneDeep(providerPropsLineCheck);
      providerPropsLineCheckClone.value.lineCheck.typeLine = "CO";
      providerPropsLineCheckClone.value.lineCheck.codeError = "100101";
      
      const providerProps = {
        value: {
          number: "1163456789",
          country : { value: "ar" },
          invalidPhoneNumber: "1163456789"
        }, 
      };

      render(<DataConsumptionContextProvider>
               <AccordionComponent />
             </DataConsumptionContextProvider>, {
        contexts: [
          { provider: AppContext.Provider, props: providerProps },
          { provider: LineCheckContext.Provider, props: providerPropsLineCheckClone }
        ],
      });

        clickButtonHeaderAccordion();

        const alertAccordion =  await screen.findByText(/Por favor, ingrese el número de línea válido para la consulta./i);   
        expect(alertAccordion).toBeInTheDocument();
    
    
    }); 
  });  
});
