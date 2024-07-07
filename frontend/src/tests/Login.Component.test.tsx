import { render } from '@testing-library/react';

import Login from '../components/Login';

test('render login component', () => {
  const { getByText } = render(
    <Login />
  );
  const text = getByText('Limbic Therapist Login');
  expect(text).toBeInTheDocument();
});
