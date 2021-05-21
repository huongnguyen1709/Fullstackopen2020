import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create a new blog</h2>

        <div>
          title &nbsp;
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author &nbsp;
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url &nbsp;
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button style={marginTop} type='submit'>
          save
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
