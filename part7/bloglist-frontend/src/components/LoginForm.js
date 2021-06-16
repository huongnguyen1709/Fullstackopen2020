import React from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  const passwordLabel = {
    marginTop: '20px',
    color: '#4169E1',
  };

  const color = {
    color: '#4169E1',
  };

  const loginButton = {
    display: 'block',
    marginTop: '20px',
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>log in to application</h3>

        <InputLabel style={color} shrink htmlFor='username'>
          username
        </InputLabel>
        <Input
          id='username'
          value={username}
          onChange={handleUsernameChange}
        ></Input>

        <InputLabel style={passwordLabel} shrink htmlFor='password'>
          password
        </InputLabel>
        <Input
          id='password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        ></Input>

        <Button
          id='login-button'
          type='submit'
          variant='contained'
          color='primary'
          size='small'
          style={loginButton}
        >
          login
        </Button>
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
