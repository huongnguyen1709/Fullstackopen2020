import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
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

  // const error = {
  //   display: errorMessage === null ? 'none' : 'flex',
  //   width: '90%',
  //   backgroundColor: 'lightgrey',
  //   border: '3.5px solid red',
  //   borderRadius: '5px',
  //   fontSize: '20px',
  //   padding: '10px',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   color: 'red',
  //   marginBottom: '20px',
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>log in to application</h1>

        <div>
          username
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
