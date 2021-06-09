import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';

import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let user = await loginService.login({
        username,
        password,
      });

      if (user) {
        blogService.setToken(user.token);
        const userId = await blogService.getUserId();
        user = {
          ...user,
          id: userId,
        };
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
        setUser(user);

        setUsername('');
        setPassword('');
      } else {
        const notification = {
          message: 'Wrong username or password',
          error: true,
        };
        dispatch(setNotification(notification, 5));
        setUsername('');
        setPassword('');
      }
    } catch (exception) {
      const notification = {
        message: 'Wrong credentials',
        error: true,
      };
      dispatch(setNotification(notification, 5));
    }
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
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    // setBlogs([]);
    blogService.setToken(null);
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
