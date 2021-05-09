const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    ...body,
    date: new Date(),
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = request.user;
    const userid = user._id;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ msg: 'Blog not found' });
    }

    if (blog.user.toString() !== userid.toString()) {
      return response.status(403).json({
        msg:
          'You do not have permission to delete this blog, only the author can delete it',
      });
    }
    await blog.remove();
    response.json({ msg: 'Blog removed' });
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedBlog = request.body;

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
      new: true,
    });
    response.json({ msg: 'Blog updated' });
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
