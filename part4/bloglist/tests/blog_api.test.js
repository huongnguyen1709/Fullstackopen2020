const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'A Lovely Novel',
    author: 'Huong Nguyen',
    url: 'dasdsadas',
    likes: 100029,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain('A Lovely Novel');
});

afterAll(() => {
  mongoose.connection.close();
});