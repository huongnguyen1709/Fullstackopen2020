import React, { useState } from 'react';
import blogService from '../services/blogs';

const AddBlog = ({ onAddNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const inputStyle = {
    marginBottom: '15px',
  };

  const form = {
    marginBottom: '30px',
  };

  const onCreate = async (e) => {
    e.preventDefault();

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });

      onAddNewBlog(newBlog);

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div style={form}>
      <form onSubmit={(e) => onCreate(e)}>
        <h2>Create New Blog</h2>

        <div style={inputStyle}>
          <label htmlFor='title'>title</label>
          &nbsp;
          <input
            type='text'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>

        <div style={inputStyle}>
          <label htmlFor='author'>author</label> &nbsp;
          <input
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div style={inputStyle}>
          <label htmlFor='url'>url</label> &nbsp;
          <input
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>

        <div style={inputStyle}>
          <button>Create</button>
          <div className='red-text center'></div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
