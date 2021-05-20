import React from 'react';
import { render } from './node_modules/@testing-library/react';
import App from './app.tsx';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
