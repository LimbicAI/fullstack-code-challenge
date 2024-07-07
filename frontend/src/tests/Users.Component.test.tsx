import { render } from '@testing-library/react';

import Users from '../components/Users';

test('render users component', () => {
  const { getByText } = render(
    <Users />
  );
  const text = getByText('Users');
  expect(text).toBeInTheDocument();
});
