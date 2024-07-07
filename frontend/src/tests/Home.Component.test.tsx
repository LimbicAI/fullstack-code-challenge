import { render } from '@testing-library/react';

import Home from '../components/Home';

test('render home component', () => {
  const { getByAltText } = render(
    <Home />
  );
  const text = getByAltText('Limbic Therapist');
  expect(text).toBeInTheDocument();
});
