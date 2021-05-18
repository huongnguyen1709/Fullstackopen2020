import React, { useState, useEffect } from 'react';
import AddBlog from './components/AddBlog';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const marginLeft = {
    marginLeft: '20px',
  };

  const inlineBlock = {
    display: 'inline-block',
  };

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

  const getUser = (userLoggedin) => {
    if (userLoggedin) {
      setUser(userLoggedin);
      blogService.setToken(userLoggedin.token);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    blogService.setToken(null);
  };

  const getNewBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog));
  };

  if (user === null) return <Login onUserLogin={getUser} />;

  return (
    <div style={marginLeft}>
      <h2>blogs</h2>
      <p style={inlineBlock}>{user.name} logged in</p> &nbsp;
      <button onClick={handleLogout}>logout</button>
      <AddBlog onAddNewBlog={getNewBlog} />
      {blogs && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
