import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import SideMenu from '../components/SideMenu';

test('render sideMenu component', () => {
  const { getByText } = render(
    <BrowserRouter>
      <SideMenu />
    </BrowserRouter>
  );
  const text = getByText('Tarik Seyceri');
  expect(text).toBeInTheDocument();
});
