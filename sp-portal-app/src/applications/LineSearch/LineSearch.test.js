import React from "react";
import _ from "lodash";
import { fakeLocalStorage, render } from "../../utils/testUtils";
import { fireEvent, waitFor } from "@testing-library/react";
import { LineSearch } from "./LineSearch";
import { AppContext } from "Context";
import { LineCheckContext } from "context/LineCheckContext";
import { axiosInstance } from "services/interceptor";

jest.mock("../../services/interceptor", () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

const providerPropsApp = {
  value: {
    setNumber: jest.fn(),
    setCountry: jest.fn(),
    setInvalidPhoneNumber: jest.fn(),
  },
};

const providerPropsLineCheck = {
  value: {
    setLoading: jest.fn(),
    setCodeError: jest.fn(),
    setHasErrors: jest.fn(),
    setTypeLine: jest.fn(),
  },
};

const responseLineCheck = {
  serviceDetails: {
    error: "OK",
    result: "0",
    level: "SUCCESS",
  },
  billNumber: "3512072757",
  cellularNumber: "3512072757",
  stgId: "AH",
  cbtId: "CR",
  cluType: "CPP",
  msisdn: "5493512072757",
  prefix: "549",
  rplId: "ACI55",
};

describe("LineSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: fakeLocalStorage(),
    });
  });

  it("renders the input field and the country select", () => {
    axiosInstance.get.mockResolvedValueOnce({ data: responseLineCheck });

    const { getByLabelText } = render(<LineSearch />, {
      contexts: [
        { provider: AppContext.Provider, props: providerPropsApp },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck },
      ],
    });

    expect(getByLabelText("Input Número de Línea")).toBeInTheDocument();
    expect(getByLabelText("pais y número")).toBeInTheDocument();
  });

  it("updates the input field when typing a phone number", () => {

    axiosInstance.get.mockResolvedValueOnce({ data: responseLineCheck });

    const { getByLabelText } = render(<LineSearch />, {
      contexts: [
        { provider: AppContext.Provider, props: providerPropsApp },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck },
      ],
    });

    const input = getByLabelText("Input Número de Línea");

    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(input.value).toBe("1234567890");

    fireEvent.keyDown(input, { key: "Backspace", code: "Backspace" });
    expect(input.value).toBe("");
  });

  it("set number and country when keyDown enter", () => {

    axiosInstance.get.mockResolvedValueOnce({ data: responseLineCheck });

    const { getByLabelText } = render(<LineSearch />, {
      contexts: [
        { provider: AppContext.Provider, props: providerPropsApp },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck },
      ],
    });
    const input = getByLabelText("Input Número de Línea");
    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(input.value).toBe("1234567890");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(providerPropsApp.value.setNumber).toHaveBeenCalled();
    expect(providerPropsApp.value.setCountry).toHaveBeenCalled();
  });

  it("sets the country correctly based on the input phone number length", () => {

    axiosInstance.get.mockResolvedValueOnce({ data: responseLineCheck });

    const { getByPlaceholderText } = render(<LineSearch />, {
      contexts: [
        { provider: AppContext.Provider, props: providerPropsApp },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck },
      ],
    });
    const input = getByPlaceholderText("Número de Línea");

    fireEvent.change(input, { target: { value: "1234" } });
    expect(input.value).toBe("1234");
    expect(input.nextSibling.textContent).toBe("");

    fireEvent.change(input, { target: { value: "12345678" } });
    expect(input.value).toBe("12345678");
    expect(input.nextSibling.textContent).toBe("UY");

    fireEvent.change(input, { target: { value: "123456789" } });
    expect(input.value).toBe("123456789");
    expect(input.nextSibling.textContent).toBe("PY");

    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(input.value).toBe("1234567890");
    expect(input.nextSibling.textContent).toBe("AR");
  });

  it("should reset the input fields when the user focuses on the input field", () => {

    axiosInstance.get.mockResolvedValueOnce({ data: responseLineCheck });

    const { getByLabelText, getByPlaceholderText } = render(<LineSearch />, {
      contexts: [
        { provider: AppContext.Provider, props: providerPropsApp },
        { provider: LineCheckContext.Provider, props: providerPropsLineCheck },
      ],
    });

    const input = getByPlaceholderText("Número de Línea");
    const countrySelect = getByLabelText("pais y número");
    fireEvent.change(input, { target: { value: "1234567890" } });
    expect(input.value).toBe("1234567890");
    fireEvent.focus(input);
    expect(input.value).toBe("");
    expect(countrySelect.textContent).toBe("");
  });

  describe("useLineCheckService", () => {
    let input;
    beforeEach(() => {
      const { getByPlaceholderText } = render(<LineSearch />, {
        contexts: [
          { provider: AppContext.Provider, props: providerPropsApp },
          {
            provider: LineCheckContext.Provider,
            props: providerPropsLineCheck,
          },
        ],
      });
      jest.clearAllMocks();
      input = getByPlaceholderText("Número de Línea");

    });

    it("It should mark the status as a CO LINE and that there was an error, since the service response has a WARNING level", async () => {
      const responseLineCheckClone = _.cloneDeep(responseLineCheck);

      responseLineCheckClone.serviceDetails.level = "WARNING";

      axiosInstance.get.mockResolvedValueOnce({ data: responseLineCheckClone });

      fireEvent.change(input, { target: { value: "123456789" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

      await waitFor(() => {
        expect(providerPropsLineCheck.value.setTypeLine).toHaveBeenCalled();
        expect(
          providerPropsLineCheck.value.setTypeLine
        ).toHaveBeenLastCalledWith("CO");
        expect(providerPropsLineCheck.value.setHasErrors).toHaveBeenCalled();
        expect(
          providerPropsLineCheck.value.setHasErrors
        ).toHaveBeenLastCalledWith(true);
      });
    });

    it("You should mark the error code as 900000", async () => {
      const responseLineCheckClone = _.cloneDeep(responseLineCheck);

      responseLineCheckClone.serviceDetails.level = "ERROR";
      responseLineCheckClone.serviceDetails.error = "900000";

      axiosInstance.get.mockResolvedValueOnce({ data: responseLineCheckClone });

      fireEvent.change(input, { target: { value: "123456789" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

      await waitFor(() => {
        expect(providerPropsLineCheck.value.setCodeError).toHaveBeenCalled();
        expect(
          providerPropsLineCheck.value.setCodeError
        ).toHaveBeenLastCalledWith(900000);
        expect(providerPropsLineCheck.value.setHasErrors).toHaveBeenCalled();
        expect(
          providerPropsLineCheck.value.setHasErrors
        ).toHaveBeenLastCalledWith(true);
      });
    });

    it("It should store in localStorage the response of the lineCheck service", async () => {
      const responseExpected = {
        billNumber: "3512072757",
        cellularNumber: "3512072757",
        stgId: "AH",
        cbtId: "CR",
        cluType: "CPP",
        msisdn: "5493512072757",
        prefix: "549",
        rplId: "ACI55",
      };

      axiosInstance.get.mockResolvedValueOnce({ data: responseLineCheck });

      fireEvent.change(input, { target: { value: "123456789" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

      await waitFor(() => {
        expect(localStorage.getItem("lineCheck")).toBe(
          JSON.stringify(responseExpected)
        );
      });
    });

    it("It should show the error code ERR_NETWORK because the service is down", async () => {
      axiosInstance.get.mockRejectedValueOnce({ code: "ERR_NETWORK" });

      fireEvent.change(input, { target: { value: "123456789" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

      await waitFor(() => {
        expect(providerPropsLineCheck.value.setCodeError).toHaveBeenCalled();
        expect(
          providerPropsLineCheck.value.setCodeError
        ).toHaveBeenLastCalledWith("ERR_NETWORK");
      });
    });

    it("The status should be updated with the error code answered by the linecHeck service", async () => {
      axiosInstance.get.mockRejectedValueOnce({
        response: {
          data: {
            serviceDetails: {
              error: "207000",
            },
          },
        },
      });

      fireEvent.change(input, { target: { value: "123456789" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

      await waitFor(() => {
        expect(providerPropsLineCheck.value.setCodeError).toHaveBeenCalled();
        expect(
          providerPropsLineCheck.value.setCodeError
        ).toHaveBeenLastCalledWith(207000);
      });
    });

    it("The lineCheck service should not be called when doing onBlur because I did not enter a line number", async () => {

      fireEvent.blur(input);

      await waitFor(() => {
        expect(axiosInstance.get).not.toHaveBeenCalled();
      });
    });

    it("You should call the lineCheck service only 1 time since it must execute the enter event and not the onBlur event", async () => {

      fireEvent.change(input, { target: { value: "1234567890" } });

      fireEvent.keyDown(input, {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
      });

      await waitFor(() => {
        expect(axiosInstance.get).toHaveBeenCalled();
      });
    });
  });
})