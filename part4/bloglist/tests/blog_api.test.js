const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('blog posts are returned as json', async () => {
  jest.setTimeout(10000);
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('the unique identifier property of the blog posts named id is defined', async () => {
  jest.setTimeout(20000);
  await api.get('/api/blogs'),
    (request, response) => {
      expect(response && response.every((blog) => blog && blog.id)).toBe(true);
    };
});

afterAll(() => {
  mongoose.connection.close();
});
