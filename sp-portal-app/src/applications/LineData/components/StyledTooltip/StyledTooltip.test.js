import { render, screen } from "@testing-library/react";
import StyledTooltip from ".";

describe("StyledTooltip", () => {
  it("renders the children inside a Tooltip", () => {
    render(
      <StyledTooltip>
        <button>Button</button>
      </StyledTooltip>
    );

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });
});
