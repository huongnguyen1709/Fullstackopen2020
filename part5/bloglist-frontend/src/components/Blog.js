import React, { useState } from 'react';

const Blog = ({ blog }) => {
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
    display: 'inline-block',
  };

  return (
    <div style={blogStyle}>
      {blog.title} &nbsp;
      <button onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? 'hide' : 'view'}
      </button>
      <div style={detailStyle}>
        <div>{blog.url}</div>
        <div style={inlineBlock}>likes {blog.likes}</div> &nbsp;
        <button>like</button>
        <div>{blog.author}</div>
      </div>
    </div>
  );
};

export default Blog;
