const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

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

blogsRouter.post('/', (request, response, next) => {
  const body = request.body;
  const blog = new Blog({
    ...body,
    date: new Date(),
  });

  blog
    .save()
    .then((savedBlog) => {
      console.log(savedBlog);
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ msg: 'Post not found' });
    }
    await blog.remove();
    response.json(blog);
    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const blog = {
    content: body.content,
    important: body.important,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
