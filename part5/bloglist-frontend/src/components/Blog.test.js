import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
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
  expect(url).toBeEmptyDOMElement;

  component.debug();
});

test("the blog's url and number of likes are shown when the button controlling the shown details has been clicked", () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Huong Nguyen',
    url: 'url.link',
    user: { id: '123456789' },
  };

  const component = render(<Blog blog={blog} />);
  const url = component.container.querySelector('.url');
  const likes = component.container.querySelector('.likes');

  // at start the url & the number of likes are not shown when the button controlling the shown details has not been clicked
  expect(url).toHaveStyle('display: none');
  expect(likes).toHaveStyle('display: none');

  // the url & the number of likes are shown when the button controlling the shown details has been clicked
  const button = component.getByText('view');
  fireEvent.click(button);

  expect(url).toHaveStyle('display: block');
  expect(likes).toHaveStyle('display: inline-block');

  component.debug();
});
