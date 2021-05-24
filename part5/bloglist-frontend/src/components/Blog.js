import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, handleChange }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [userId, setUserId] = useState(null);

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

  const buttonStyle = {
    margin: '5px',
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

  const authorAction = () => {
    const blogId = blog.user.id;
    blogService
      .getUserId()
      .then((userId) => {
        setUserId(userId);
      })
      .catch((err) => console.log(err));

    if (userId === blogId) {
      return (
        <button style={buttonStyle} onClick={handleDelete}>
          remove
        </button>
      );
    } else return null;
  };

  return (
    <div style={blogStyle}>
      {blog.title} &nbsp;
      <button onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? 'hide' : 'view'}
      </button>
      <div style={detailStyle}>
        <div style={url} className='url'>
          {blog.url}
        </div>
        <div className='likes' style={inlineBlock}>
          likes {likes}
        </div>{' '}
        &nbsp;
        <button onClick={addLike}>like</button>
        <div>{blog.author}</div>
        {authorAction()}
      </div>
    </div>
  );
};

export default Blog;
