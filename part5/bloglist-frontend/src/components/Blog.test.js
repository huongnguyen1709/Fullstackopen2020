import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Huong Nguyen',
};

test('renders title and author', () => {
  const component = render(<Blog blog={blog} />);
  const url = component.container.querySelector('.url');

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
  expect(url).toBeEmptyDOMElement;

  component.debug();
});

test("the blog's url and number of likes are shown when the button controlling the shown details has been clicked", () => {
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

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
  const addLike = jest.fn();
  const component = render(<button onClick={addLike}>like</button>);
  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(addLike.mock.calls).toHaveLength(2);
  component.debug();
});
