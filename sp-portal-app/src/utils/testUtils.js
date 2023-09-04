import React from "react";
import { render } from "@testing-library/react";

const customRender = (ui, { contexts = [], ...renderOptions }) => {
  const Wrapper = ({ children }) => {
    return contexts.reduceRight((child, context) => {
      const { provider: Provider, props } = context;
      return <Provider {...props}>{child}</Provider>;
    }, children);
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { customRender as render };

export const fakeLocalStorage = (() => {
  let store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})
