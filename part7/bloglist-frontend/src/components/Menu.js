import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Menu = ({ loggedInUser, handleLogout }) => {
  const checkUserLoggedIn = {
    display: loggedInUser ? '' : 'none',
    marginRight: 40,
  };

  const marginRight = {
    marginRight: 40,
  };

  const navBar = {
    backgroundColor: 'black',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  };

  return (
    <AppBar position='static' style={navBar}>
      <Toolbar>
        <Typography variant='h6' style={marginRight}>
          <Link to='/' style={linkStyle}>
            blogs
          </Link>
        </Typography>

        <Typography variant='h6' style={marginRight}>
          <Link to={loggedInUser ? '/users' : '/'} style={linkStyle}>
            users
          </Link>
        </Typography>

        <Typography variant='h6' style={checkUserLoggedIn}>
          {loggedInUser && loggedInUser.name} logged-in
        </Typography>

        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={handleLogout}
          style={checkUserLoggedIn}
        >
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
