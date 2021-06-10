import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsersList } from '../reducers/usersReducer';

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>
        <strong>added blogs</strong>
      </p>
      <ul>
        {user &&
          user.blogs &&
          user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  );
};

export default User;
