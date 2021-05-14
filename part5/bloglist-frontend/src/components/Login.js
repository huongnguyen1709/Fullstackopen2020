import React, { useState } from 'react';
import loginService from '../services/login';

const Login = ({ userLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      userLogin(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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

  return (
    <div>
      <form style={formStyle} onSubmit={(e) => handleLogin(e)}>
        <h1>log in to application</h1>

        <div style={inputStyle} className='input-field'>
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

        <div style={inputStyle} className='input-field'>
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

        <div style={inputStyle} className='input-field'>
          <button>login</button>
          <div className='red-text center'></div>
        </div>
      </form>
    </div>
  );
};

export default Login;
