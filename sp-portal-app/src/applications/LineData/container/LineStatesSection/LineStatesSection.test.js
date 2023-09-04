import React from "react";
import { render, screen } from "@testing-library/react";
import LineStatesSection from ".";

jest.mock("../../formatters/formatLineStates", () => ({
  formatLineStates: jest.fn().mockReturnValue([{ label: "Estado 1", value: "Activo" }])
}));

jest.mock("../../formatters/formatPlanData", () => ({
  formatPlanData: jest.fn().mockReturnValue([{ label: "Plan", value: "Plan A" }])
}));

jest.mock('../../components', () => ({
    HorizontalBlockInfo: () => <div>Mock component HorizontalBlockInfo</div>
}));

const StubLineState = [
    {
      title: "Actual",
      description: "Inconsistente",
      id: "IN",
      tooltipDescription: <div>Tooltip</div>,
    },
    {
      title: "Anterior",
      description: "Suspendido",
    },
    {
      title: "Del servicio",
      description: "Suspendido",
      tooltipDescription: "Suspendido manual",
    },
  ];

describe("LineStatesSection", () => {
    
  it("should render correctly with mocked dependencies", () => {
  
    render(<LineStatesSection condition={StubLineState} />);

    const title = screen.getByText(/Estados de la línea/i);
    expect(title).toBeInTheDocument();
  });

  it("The component should render correctly HorizontalBlockInfo", () => {
    render(<LineStatesSection condition={StubLineState} />);

    const componentsHorizontalBlockInfo = screen.getAllByText(/Mock component HorizontalBlockInfo/i);
    expect(componentsHorizontalBlockInfo).toHaveLength(2);
  });
});