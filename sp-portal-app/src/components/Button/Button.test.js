import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

test('Button Component - Not Disabled', () => {
    const mockedButtonClick = jest.fn();

    render(<Button disabled={false} text="Button Test" onButtonClick={() => mockedButtonClick()} />);
    const ButtonText = screen.getByText("Button Test");
    expect(ButtonText).toBeInTheDocument();

    fireEvent.click(ButtonText);
    expect(mockedButtonClick).toBeCalled();
});

test('Button Component - Disabled', () => {
    const mockedButtonClick = jest.fn();

    render(<Button disabled={true} text="Button Test" onButtonClick={() => mockedButtonClick()} />);
    const ButtonText = screen.getByText("Button Test");
    expect(ButtonText).toBeInTheDocument();

    fireEvent.click(ButtonText);
    expect(mockedButtonClick).not.toBeCalled();
});
