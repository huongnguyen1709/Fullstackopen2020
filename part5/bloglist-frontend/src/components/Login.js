import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const Login = ({ onUserLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const inputStyle = {
    marginBottom: '20px',
    fontSize: '20px',
  };

  const formStyle = {
    width: '50vw',
    margin: '0 auto',
  };

  const fontSize = {
    fontSize: '15px',
    padding: '0 5px',
  };

  const error = {
    display: errorMessage === null ? 'none' : 'flex',
    width: '90%',
    backgroundColor: 'lightgrey',
    border: '3.5px solid red',
    borderRadius: '5px',
    fontSize: '20px',
    padding: '10px',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'red',
    marginBottom: '20px',
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      onUserLogin(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  return (
    <div>
      <form style={formStyle} onSubmit={(e) => handleLogin(e)}>
        <h1>log in to application</h1>

        <div style={error}>{errorMessage}</div>

        <div style={inputStyle}>
          <label htmlFor='username'>username</label>
          &nbsp;
          <input
            style={fontSize}
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>

        <div style={inputStyle}>
          <label htmlFor='password'>password</label> &nbsp;
          <input
            style={fontSize}
            type='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            minLength='6'
            required
          />
        </div>

        <div style={inputStyle}>
          <button>login</button>
          <div className='red-text center'></div>
        </div>
      </form>
    </div>
  );
};

export default Login;
