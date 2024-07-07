import { render, screen } from '@testing-library/react';
import App from '../App';

test('render the app', () => {
  render(<App />);
  const element = screen.getByText(/Limbic Therapist/i);
  expect(element).toBeInTheDocument();
});
