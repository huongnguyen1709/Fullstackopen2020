import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  addLikeBlog,
  deleteBlog,
  addCommentToBlog,
} from '../reducers/blogReducer';

const Blog = ({ blog, loggedInUserID }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');

  const inlineBlock = {
    display: 'inline-block',
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

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div style={inlineBlock}>likes {blog.likes}</div>
      &nbsp;
      <button onClick={() => dispatch(addLikeBlog(blog))}>like</button>
      <div>added by {blog.author}</div>
      <h3>comments</h3>
      <input
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button
        type='submit'
        onClick={() => {
          dispatch(addCommentToBlog(blog, comment));
          setComment('');
        }}
      >
        add comment
      </button>
      <ul>
        {blog &&
          blog.comments &&
          blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
      {authorAction()}
    </div>
  );
};

export default Blog;
