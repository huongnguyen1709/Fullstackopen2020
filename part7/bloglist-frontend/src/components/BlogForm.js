import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { createNewBlog } from '../reducers/blogReducer';

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const marginTop = {
    marginTop: '10px',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    dispatch(createNewBlog(newBlog));
    toggleVisibility();

    setTitle('');
    setAuthor('');
    setUrl('');

    const notification = {
      message: `a new blog ${title} by ${author} added`,
      error: false,
    };
    dispatch(setNotification(notification, 5));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create a new blog</h2>

        <div>
          title &nbsp;
          <input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author &nbsp;
          <input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url &nbsp;
          <input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button style={marginTop} type='submit'>
          save
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
