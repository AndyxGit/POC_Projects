import { axiosInstance } from "./interceptor";

jest.mock("../utils/session.js", () => ({
  createSessionId: jest.fn(() => "session-id"),
}));

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    defaults: {
      baseURL: "https://api.com",
      headers: {
        "Content-Type": "application/json",
        "Session-Id": "session-id",
        "Channel-Id": "psp",
      },
    },
  })),
}));

describe("axiosInstance", () => {
  it("should have the correct properties", () => {
    expect(axiosInstance).toBeDefined();
    expect(axiosInstance.defaults.baseURL).toEqual("https://api.com");
    expect(axiosInstance.defaults.headers["Content-Type"]).toEqual(
      "application/json"
    );
    expect(axiosInstance.defaults.headers["Session-Id"]).toEqual("session-id");
    expect(axiosInstance.defaults.headers["Channel-Id"]).toEqual("psp");
  });
});
