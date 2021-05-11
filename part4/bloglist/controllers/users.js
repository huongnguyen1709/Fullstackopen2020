const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const { check, validationResult } = require('express-validator');

usersRouter.post(
  '/',
  [
    check(
      'password',
      'Please enter a password with 3 or more characters'
    ).isLength({ min: 3 }),
  ],
  async (request, response) => {
    const errors = validationResult(request);
    console.log(errors);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  }
);

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
