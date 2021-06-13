import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ loggedInUser, handleLogout }) => {
  const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#dddddd',
  };
  const liStyle = {
    float: 'left',
    display: 'block',

    textAlign: 'center',
    padding: 5,
  };

  const checkUserLoggedIn = {
    float: 'left',
    display: loggedInUser ? 'block' : 'none',
    textAlign: 'center',
    padding: 5,
  };

  return (
    <ul style={ulStyle}>
      <li style={liStyle}>
        <Link to='/'>blogs</Link>
      </li>
      <li style={liStyle}>
        <Link to={loggedInUser ? '/users' : '/'}>users</Link>
      </li>
      <li style={checkUserLoggedIn}>
        {loggedInUser && loggedInUser.name} logged-in
      </li>
      <li style={checkUserLoggedIn}>
        <button onClick={handleLogout}>logout</button>
      </li>
    </ul>
  );
};

export default Menu;
