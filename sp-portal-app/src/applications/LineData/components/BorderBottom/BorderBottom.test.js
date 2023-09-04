import { render, screen } from "@testing-library/react";
import  BorderBottom  from ".";


describe('BorderBottom component', () => {
  it('renders a div element with correct background color', () => {
    const backgroundColor = '#FF0000';
    render(<BorderBottom backgroundColor={backgroundColor} />);
    const borderBottomEl = screen.getByTestId('border-bottom');
    expect(borderBottomEl).toBeInTheDocument();
    expect(borderBottomEl).toHaveStyle(`background-color: ${backgroundColor}`);
  });

  it('renders a div element with default background color', () => {
    render(<BorderBottom />);
    const borderBottomEl = screen.getByTestId('border-bottom');
    const root = document.documentElement;
    const blueColor = getComputedStyle(root).getPropertyValue('--institutional-blue');
    expect(borderBottomEl).toBeInTheDocument();
    expect(borderBottomEl).toHaveStyle(`background-color: ${blueColor}`);
  });
});
