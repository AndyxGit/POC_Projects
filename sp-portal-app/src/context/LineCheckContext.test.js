import { act, render } from "@testing-library/react";
import { LineCheckContext } from "./LineCheckContext";
import LineCheckContextProvider from "./LineCheckContext";

describe("LineCheckContextProvider", () => {
  it("should update lineCheck state when setHasErrors is called", () => {
    let lineCheckValue;
    let setHasErrorsFn;

    render(
      <LineCheckContextProvider>
        <LineCheckContext.Consumer>
          {(context) => {
            lineCheckValue = context.lineCheck;
            setHasErrorsFn = context.setHasErrors;
            return null;
          }}
        </LineCheckContext.Consumer>
      </LineCheckContextProvider>
    );

    expect(lineCheckValue.hasErrors).toBe(false);

    act(() => {
      setHasErrorsFn(true);
    });

    expect(lineCheckValue.hasErrors).toBe(true);
  });

  it("should update lineCheck state when setCodeError is called", () => {
    let lineCheckValue;
    let setCodeErrorFn;

    render(
      <LineCheckContextProvider>
        <LineCheckContext.Consumer>
          {(context) => {
            lineCheckValue = context.lineCheck;
            setCodeErrorFn = context.setCodeError;
            return null;
          }}
        </LineCheckContext.Consumer>
      </LineCheckContextProvider>
    );

    expect(lineCheckValue.codeError).toBe("");

    act(() => {
      setCodeErrorFn("200003");
    });

    expect(lineCheckValue.codeError).toBe("200003");
  });

  it("should update lineCheck state when setLoading is called", () => {
    let lineCheckValue;
    let setLoadingFn;

    render(
      <LineCheckContextProvider>
        <LineCheckContext.Consumer>
          {(context) => {
            lineCheckValue = context.lineCheck;
            setLoadingFn = context.setLoading;
            return null;
          }}
        </LineCheckContext.Consumer>
      </LineCheckContextProvider>
    );

    expect(lineCheckValue.loading).toBe(false);

    act(() => {
      setLoadingFn(true);
    });

    expect(lineCheckValue.loading).toBe(true);
  });

  it("should update lineCheck state when setTypeLine is called", () => {
    let lineCheckValue;
    let setTypeLineFn;

    render(
      <LineCheckContextProvider>
        <LineCheckContext.Consumer>
          {(context) => {
            lineCheckValue = context.lineCheck;
            setTypeLineFn = context.setTypeLine;
            return null;
          }}
        </LineCheckContext.Consumer>
      </LineCheckContextProvider>
    );

    expect(lineCheckValue.typeLine).toBe("");

    act(() => {
      setTypeLineFn("CO");
    });

    expect(lineCheckValue.typeLine).toBe("CO");
  });

});
