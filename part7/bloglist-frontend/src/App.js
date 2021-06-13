import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';
import Menu from './components/Menu';

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

  const matchUser = useRouteMatch('/users/:id');
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const matchBlog = useRouteMatch('/blogs/:id');
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

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

  const boxStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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

  return (
    <div style={marginLeft}>
      <Menu
        loggedInUser={loggedInUser}
        handleLogout={() => dispatch(logoutUser())}
      />
      <h2 style={marginTop}>blogs</h2>
      <Notification />

      {loggedInUser === null ? (
        loginForm()
      ) : (
        <div style={marginTop}>
          <Switch>
            <Route path='/users/:id'>
              <User user={user} />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/blogs/:id'>
              <Blog blog={blog} loggedInUserID={loggedInUser.id} />
            </Route>
            <Route path='/'>
              <div style={marginTop}>{blogForm()}</div>

              <div style={marginTop}>
                {blogs &&
                  blogs.map((blog) => (
                    <div key={blog.id} style={boxStyle}>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </div>
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
