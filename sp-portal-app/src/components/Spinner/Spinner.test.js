import { render } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("it should show the spinner component", () => {
    const { container } = render(<Spinner />);

    expect(container).toBeInTheDocument();
  });
});
