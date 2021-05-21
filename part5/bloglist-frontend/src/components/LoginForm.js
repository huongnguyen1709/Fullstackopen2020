import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
