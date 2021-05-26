import React, { useState } from 'react';

const BlogForm = ({ createBlog, message }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const marginTop = {
    marginTop: '10px',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');

    message(`a new blog ${title} by ${author} added`);
    setTimeout(() => {
      message(null);
    }, 5000);
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
