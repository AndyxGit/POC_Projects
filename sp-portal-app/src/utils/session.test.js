import { generateRandomString } from "./session";

const mockGetRandomValues = jest.fn().mockImplementation((array) => {
  for (let i = 0; i < array.length; i++) {
    array[i] = Math.floor(Math.random() * 256);
  }
});
global.crypto = {
  getRandomValues: mockGetRandomValues,
};

describe("generateRandomString", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns a random string of the specified length", () => {
    const length = 5;
    const result = generateRandomString(length);
    expect(result).toHaveLength(length);

    delete global.crypto;
  });

});
