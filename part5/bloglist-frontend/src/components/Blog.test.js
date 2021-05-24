import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Huong Nguyen',
    user: { id: '123456789' },
  };

  const component = render(<Blog blog={blog} />);
  const url = component.container.querySelector('.url');

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
  expect(url).toBeEmpty();

  component.debug();
});
