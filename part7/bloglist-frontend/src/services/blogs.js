import axios from 'axios';
import jwtdecode from 'jwt-decode';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateLikes = async (blog) => {
  const updatedBlog = {
    ...blog,
    user: blog.user.id,
    likes: blog.likes + 1,
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  console.log(response.data);
  return response.data;
};

const getUserId = async () => {
  const decodedToken = jwtdecode(token);
  const userId = decodedToken.id;

  return userId;
};

export default {
  getAll,
  setToken,
  create,
  updateLikes,
  deleteBlog,
  getUserId,
};
