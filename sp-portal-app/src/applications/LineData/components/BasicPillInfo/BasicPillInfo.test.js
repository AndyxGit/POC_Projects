import { render, screen } from "@testing-library/react";
import  BasicPillInfo  from ".";

describe("Basic pill info", () => { 
  it("should correctly show date and title", () => { 
    const date = "04/05/2023";
    const title = "Creación";

    render(<BasicPillInfo title={title} date={date} />);

    const findDate = screen.getByText(date);
    const findTitle = screen.getByText(/Creación/i);

    expect(findTitle).toBeInTheDocument();
    expect(findDate).toBeInTheDocument();
  });

  it("should fill the aria-label as an empty string since the date is not provided.", () => { 
    const title = "Creación";
    const date = "";
    render(<BasicPillInfo title={title} date={date} />);

    const emptyParagraph = screen.getByLabelText('');

    expect(emptyParagraph).toBeInTheDocument();

  });
});
