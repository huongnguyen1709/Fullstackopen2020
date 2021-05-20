import React, { useState, useEffect, useRef } from 'react';
import AddBlog from './components/AddBlog';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const blogFormRef = useRef();
  const [isChange, setIsChange] = useState(false);

  const marginLeft = {
    marginLeft: '20px',
  };

  const marginTop = {
    marginTop: '20px',
  };

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      initialBlogs = initialBlogs.sort(function (a, b) {
        return b.likes - a.likes;
      });
      setBlogs(initialBlogs);
    });
  }, [user, isChange]);

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
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const blogForm = () => {};

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

  console.log(blogs);

  return (
    <div style={marginLeft}>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {blogForm()}
        </div>
      )}

      <div style={marginTop}>
        {blogs &&
          blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleChange={() => setIsChange(!isChange)}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
