import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addLikeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog, loggedInUserID }) => {
  const dispatch = useDispatch();

  const [showDetail, setShowDetail] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailStyle = {
    display: showDetail ? '' : 'none',
  };

  const inlineBlock = {
    display: showDetail ? 'inline-block' : 'none',
  };

  const url = {
    display: showDetail ? '' : 'none',
  };

  const removeButtonStyle = {
    margin: '5px',
    backgroundColor: '#318CE7',
    borderRadius: '5px',
    border: 'none',
  };

  const handleDelete = async () => {
    console.log(blog.id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  const authorAction = () => {
    if (blog.user) {
      const blogUserID = blog.user;

      if (loggedInUserID === blogUserID) {
        return (
          <button style={removeButtonStyle} onClick={handleDelete}>
            remove
          </button>
        );
      }
      if (blog.user.id) {
        const blogUserID = blog.user.id;
        if (loggedInUserID === blogUserID) {
          return (
            <button style={removeButtonStyle} onClick={handleDelete}>
              remove
            </button>
          );
        }
      }
    } else return null;
  };

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} &nbsp;
      <button id='view-button' onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? 'hide' : 'view'}
      </button>
      <div className='detail' style={detailStyle}>
        <div style={url} className='url'>
          {blog.url}
        </div>
        <div style={inlineBlock}>likes {blog.likes}</div>
        &nbsp;
        <button onClick={() => dispatch(addLikeBlog(blog))}>like</button>
        <div>{blog.author}</div>
        {authorAction()}
      </div>
    </div>
  );
};

export default Blog;
