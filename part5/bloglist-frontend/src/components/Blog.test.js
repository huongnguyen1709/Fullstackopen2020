import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import BlogForm from './BlogForm';

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

test('the form calls the event handler it received as props with the right details when a new blog is created', () => {
  const createBlog = jest.fn();
  const message = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} message={message} />
  );

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' },
  });
  fireEvent.change(author, {
    target: { value: 'Huong Nguyen' },
  });
  fireEvent.change(url, {
    target: { value: 'url link' },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(JSON.stringify(createBlog.mock.calls[0][0])).toBe(
    JSON.stringify({
      title: 'testing of forms could be easier',
      author: 'Huong Nguyen',
      url: 'url link',
    })
  );
  component.debug();
});
