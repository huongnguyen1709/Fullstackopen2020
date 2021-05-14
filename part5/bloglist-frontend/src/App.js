import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const getUser = (userLogin) => {
    if (userLogin) {
      setUser(userLogin);
      blogService.setToken(userLogin.token);
    }
  };

  const marginLeft = {
    marginLeft: '20px',
  };

  if (user === null) return <Login userLogin={getUser} />;

  return (
    <div style={marginLeft}>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
