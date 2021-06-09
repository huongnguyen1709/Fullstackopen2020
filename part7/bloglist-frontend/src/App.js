import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import Togglable from './components/Togglable';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  const marginLeft = {
    marginLeft: '20px',
  };

  const marginTop = {
    marginTop: '20px',
  };

  const inlineBlock = {
    display: 'inline-block',
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(
      loginUser({
        username,
        password,
      })
    );
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel='log in'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm toggleVisibility={toggleVisibility} />
    </Togglable>
  );

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div style={marginLeft}>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div style={marginTop}>
          <p style={inlineBlock}>{user.name} logged-in</p> &nbsp;
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          <div style={marginTop}>
            {blogs &&
              blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} userID={user.id} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
