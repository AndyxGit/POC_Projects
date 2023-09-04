import React from "react";
import { render, screen } from "@testing-library/react";
import { formatRegistersData } from "../../formatters/formatRegistersData";

import BasicPillsContainer from ".";

const stubFormatRegistersData = [
  {
    title: "Creación",
    date: "11/05/2023",
  },
  {
    title: "Última recarga",
    date: "10/05/2023",
  },
  {
    title: "Suspensión",
    date: "22/05/2023",
  },
  {
    title: "Cancelación",
    date: "15/05/2023",
  },
  {
    title: "expiration",
    date: "12/05/2023",
  }
];

const stubRegister = {
  registers: {
    creation: "2023-05-11 17:08:53.00 -0300",
    lastRecharge: "2023-05-10 17:08:53.00 -0300",
    suspended: "2024-03-04 00:00:00.00 -0300",
    cancelled: "2024-03-08 00:00:00.00 -0300",
    expiration: "2023-05-02 17:09:00.00 -0300",
  },
};

jest.mock("../../formatters/formatRegistersData", () => ({
  formatRegistersData: jest.fn(),
}));

jest.mock("../../components", () => ({
  __esModule: true,
  BasicPillInfo: () => <div>Mock component BasicPillInfo</div>,
}));

describe("BasicPillsContainer", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should render correctly with mocked dependencies", async () => {
    formatRegistersData.mockReturnValue(stubFormatRegistersData);

    render(<BasicPillsContainer registers={stubRegister} />);

    const textComponenteBasicPillInfo = screen.getAllByText(
      /Mock component BasicPillInfo/i
    );

    expect(textComponenteBasicPillInfo).toHaveLength(5);
  });
});
