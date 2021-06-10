import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';

import Togglable from './components/Togglable';

import { initializeBlogs } from './reducers/blogReducer';
import {
  initializeUser,
  loginUser,
  logoutUser,
} from './reducers/loggedInUserReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const users = useSelector((state) => state.users);

  const match = useRouteMatch('/users/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

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

  const padding = {
    paddingRight: 5,
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
      {loggedInUser === null ? (
        loginForm()
      ) : (
        <div style={marginTop}>
          <p style={inlineBlock}>{loggedInUser.name} logged-in</p> &nbsp;
          <button onClick={handleLogout}>logout</button>
          <div>
            <Link to='/' style={padding}>
              home
            </Link>
            <Link to='/users' style={padding}>
              users
            </Link>
          </div>
          <Switch>
            <Route path='/users/:id'>
              <User user={user} />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/'>
              <div style={marginTop}>{blogForm()}</div>

              <div style={marginTop}>
                {blogs &&
                  blogs.map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      loggedInUserID={loggedInUser.id}
                    />
                  ))}
              </div>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
};

export default App;
