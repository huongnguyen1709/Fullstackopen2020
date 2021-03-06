const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'A Lovely Life',
    author: 'Huong Nguyen',
    url: 'dasdsadas',
    likes: 108,
  },
  {
    title: 'A Lovely Blog',
    author: 'Huong Nguyen',
    url: 'dasdsadas',
    likes: 354,
  },
];

const initialUsers = {
  username: 'root',
  blogs: [],
  name: 'Amy',
  password: 'salainen',
};

beforeAll(async () => {
  const response = await api.post('/api/users').send(initialUsers);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('blog posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('the unique identifier property of the blog posts named id is defined', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body && response.body.every((blog) => blog && blog.id)).toBe(
    true
  );
});

test('a valid blog can be added with token authentication', async () => {
  const userLogin = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'salainen',
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const token = userLogin.body.token;
  const newBlog = {
    title: 'A Lovely Novel',
    author: 'Huong Nguyen',
    url: 'dasdsadas',
    likes: 100029,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api
    .get('/api/blogs')
    .set('Authorization', `bearer ${token}`);

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain('A Lovely Novel');
});

test('the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'A Lovely Novel',
    author: 'Huong Nguyen',
    url: 'dasdsadas',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);
  const blog = response.body.find((r) => r.title === 'A Lovely Novel');
  const likes = blog.likes;

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain('A Lovely Novel');
  expect(likes).toBe(0);
});

test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
  const newBlog = {
    author: 'Huong Nguyen',
    like: 9798,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
  const newBlog = {
    title: 'A Lovely Novel',
    author: 'Huong Nguyen',
    url: 'dasdsadas',
    likes: 100029,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
