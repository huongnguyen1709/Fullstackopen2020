import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { createNewBlog } from '../reducers/blogReducer';

import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const buttonStyle = {
    marginTop: '30px',
    display: 'block',
  };

  const inputStyle = {
    color: '#4169E1',
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
        <h3>Create a new blog</h3>

        <InputLabel style={inputStyle} shrink htmlFor='title'>
          title
        </InputLabel>
        <Input
          id='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        ></Input>

        <InputLabel style={inputStyle} shrink htmlFor='author'>
          author
        </InputLabel>
        <Input
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        ></Input>

        <InputLabel style={inputStyle} shrink htmlFor='url'>
          url
        </InputLabel>
        <Input
          id='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        ></Input>

        <Button
          style={buttonStyle}
          type='submit'
          variant='contained'
          color='primary'
          size='small'
        >
          save
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
