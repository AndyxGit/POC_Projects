import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  const mockOnClick = jest.fn();
  const mockTitle = 'Card Title';
  const mockName = 'Card Name';
  const mockIcon = 'mdi-account';

  it('should render Card component with correct props', () => {
    const { getByLabelText, getByText } = render(
      <Card title={mockTitle} name={mockName} icon={mockIcon} onClick={mockOnClick} />
    );
    expect(getByLabelText(mockTitle)).toBeInTheDocument();
    expect(getByText(mockName)).toBeInTheDocument();
  });

  it('should call onClick function when clicked', () => {
    const { getByLabelText } = render(
      <Card title={mockTitle} name={mockName} icon={mockIcon} onClick={mockOnClick} />
    );
    fireEvent.click(getByLabelText(mockTitle));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick function when Enter key is pressed', () => {
    const { getByLabelText } = render(
      <Card title={mockTitle} name={mockName} icon={mockIcon} onClick={mockOnClick} />
    );
    fireEvent.keyDown(getByLabelText(mockTitle), { key: 'Enter', code: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick function when NumpadEnter key is pressed', () => {
    const { getByLabelText } = render(
      <Card title={mockTitle} name={mockName} icon={mockIcon} onClick={mockOnClick} />
    );
    fireEvent.keyDown(getByLabelText(mockTitle), { key: 'Enter', code: 'NumpadEnter' });
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
