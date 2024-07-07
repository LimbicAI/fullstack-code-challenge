import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Answers from '../components/Answers';

test('render answers component', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Answers />
    </BrowserRouter>
  );
  const text = getByText('Answers');
  expect(text).toBeInTheDocument();
});
