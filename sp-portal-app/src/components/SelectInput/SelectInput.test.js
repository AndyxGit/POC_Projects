import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SelectInput } from './SelectInput';

describe('SelectInput component', () => {
  const options = [
    { value: '1', label: 'Option 1' }
  ];

  const onChangeMock = jest.fn();

  it('renders the component with label and options', () => {
    const { getByText } = render(
      <SelectInput
        name="test-select"
        label="Test Select"
        options={options}
        onChange={onChangeMock}
      />
    );

    expect(getByText('Test Select')).toBeInTheDocument();
    const option = getByText('Option 1');
    expect(option).toBeInTheDocument();
  });
});
