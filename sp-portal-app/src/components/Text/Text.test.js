import { Text } from './Text';
import { render, screen } from '@testing-library/react';


test('Text Component - Props', () => {
  render(<Text text='Testing Text Component' />);
  const textComponent = screen.getByText('Testing Text Component');
  expect(textComponent).toBeInTheDocument();
});


