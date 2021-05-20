import React, { useState } from 'react';
import blogs from '../services/blogs';
import blogService from '../services/blogs';

const Blog = ({ blog, handleChange, user }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

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
    display: 'inline-block',
  };

  const buttonStyle = {
    margin: '5px',
    backgroundColor: 'blue',
    backgroundColor: '#318CE7',
    borderRadius: '5px',
    border: 'none',
  };

  const addLike = async () => {
    const response = await blogService.update({
      ...blog,
      user: blog.user.id,
      likes: likes + 1,
    });
    setLikes(response.likes);
  };

  const handleDelete = async () => {
    console.log(blog.id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id);
      handleChange();
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} &nbsp;
      <button onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? 'hide' : 'view'}
      </button>
      <div style={detailStyle}>
        <div>{blog.url}</div>
        <div style={inlineBlock}>likes {likes}</div> &nbsp;
        <button onClick={addLike}>like</button>
        <div>{blog.author}</div>
        <button style={buttonStyle} onClick={handleDelete}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
