import React from "react";
import { createContext } from "react";
import { screen } from "@testing-library/react";
import { fakeLocalStorage, render } from "./testUtils";

const MockCustomContext = createContext();

const MockCustomContextProvider = ({ customContext, children }) => (
    <MockCustomContext.Provider value={customContext}>
      {children}
    </MockCustomContext.Provider>
  );

describe("customRender", () => {
  it("renders the provided component with custom contexts", () => {
    const TestComponent = () => (
      <div>
        <p>Custom Render Test</p>
      </div>
    );

    const customProviderProps = { value: "customValue"  };

    render(
      <TestComponent />,
      { contexts: [{ provider: MockCustomContextProvider, props: customProviderProps }] }
    );

    expect(screen.getByText("Custom Render Test")).toBeInTheDocument();
  });

  it("renders the provided component without => custom contexts", () => {
    const TestComponent = () => (
      <div>
        <p>Custom Render Test</p>
      </div>
    );

    render(<TestComponent />, {});
    expect(screen.getByText("Custom Render Test")).toBeInTheDocument();
  });
});

describe("fakeLocalStorage", () => {
  const key = "testKey";
  const value = "testValue";

  const localStorageInstance = fakeLocalStorage();

  it("test_set_and_get_item", () => {
    localStorageInstance.setItem(key, value);
    expect(localStorageInstance.getItem(key)).toBe(value);
  });

  it("test_remove_item", () => {
  
    localStorageInstance.setItem(key, value);
    localStorageInstance.removeItem(key);
    expect(localStorageInstance.getItem(key)).toBeNull();
  });

  it("test_set_existing_key", () => {
   
    const value1 = "testValue1";
    const value2 = "testValue2";

    const localStorageInstance = fakeLocalStorage();

    localStorageInstance.setItem(key, value1);
    localStorageInstance.setItem(key, value2);

    expect(localStorageInstance.getItem(key)).toBe(value2);
  });

  it("test_get_nonexistent_key", () => {
    const key = "nonexistentKey";
    expect(localStorageInstance.getItem(key)).toBeNull()
  });

  it("test_clear_storage", () => {
    const key1 = "testKey1";
    const value1 = "testValue1";
    const key2 = "testKey2";
    const value2 = "testValue2";

    localStorageInstance.setItem(key1, value1);
    localStorageInstance.setItem(key2, value2);
    localStorageInstance.clear();

    expect(localStorageInstance.getItem(key1)).toBeNull();
    expect(localStorageInstance.getItem(key2)).toBeNull();
  });
});