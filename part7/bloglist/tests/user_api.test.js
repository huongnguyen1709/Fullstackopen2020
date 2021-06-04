const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

test('check that invalid users are not created and invalid add user operation returns a suitable status code and error message', async () => {
  const newUser = {
    username: 'wscsdas',
    blogs: [],
    name: 'huongamy123',
    password: 'sa',
  };

  await api.post('/api/users').send(newUser).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
