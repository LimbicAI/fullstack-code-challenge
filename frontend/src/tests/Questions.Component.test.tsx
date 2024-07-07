import { render } from '@testing-library/react';

import Questions from '../components/Questions';

test('render questions component', () => {
  const { getByText } = render(
    <Questions />
  );
  const text = getByText('Questions');
  expect(text).toBeInTheDocument();
});
