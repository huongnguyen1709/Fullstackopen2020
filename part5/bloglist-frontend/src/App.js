import React, { useState, useEffect } from 'react';
import AddBlog from './components/AddBlog';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const marginLeft = {
    marginLeft: '20px',
  };

  const inlineBlock = {
    display: 'inline-block',
  };

  const successfull = {
    display: message === '' ? 'none' : 'flex',
    width: '90%',
    backgroundColor: 'lightgrey',
    border: '3.5px solid green',
    borderRadius: '5px',
    fontSize: '20px',
    padding: '10px',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'green',
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const getUserLoggedin = (userLoggedin) => {
    if (userLoggedin) {
      setUser(userLoggedin);
      blogService.setToken(userLoggedin.token);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    setBlogs([]);
    blogService.setToken(null);
  };

  const getNewBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog));
  };

  const getMessage = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage('');
    }, 4000);
  };

  console.log(blogs);

  if (user === null) return <Login onUserLogin={getUserLoggedin} />;

  return (
    <div style={marginLeft}>
      <h2>blogs</h2>
      <div style={successfull}>{message}</div>
      <p style={inlineBlock}>{user.name} logged in</p> &nbsp;
      <button onClick={handleLogout}>logout</button>
      <AddBlog onMessage={getMessage} onAddNewBlog={getNewBlog} />
      {blogs && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
