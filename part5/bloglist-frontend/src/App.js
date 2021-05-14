import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const getUser = (userLogin) => {
    if (userLogin) {
      setUser(userLogin);
      blogService.setToken(userLogin.token);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    blogService.setToken(null);
  };

  const marginLeft = {
    marginLeft: '20px',
  };

  const inlineBlock = {
    display: 'inline-block',
  };
  console.log(window.localStorage);
  if (user === null) return <Login userLogin={getUser} />;

  return (
    <div style={marginLeft}>
      <h2>blogs</h2>
      <p style={inlineBlock}>{user.name} logged in</p> &nbsp;
      <button onClick={handleLogout}>logout</button>
      {blogs && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
