const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });

    response.json(blogs);
  } catch (error) {
    next(error);
  }
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

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;
  console.log(user);
  const userid = user._id;
  console.log(userid);
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ msg: 'Blog not found' });
  }

  if (blog.user.toString() !== userid.toString()) {
    return response.status(403).json({
      msg: 'You do not have permission to delete this blog, only the author can delete it',
    });
  }

  var userBlogs = user.blogs;

  userBlogs = userBlogs.filter((blogId) => {
    return blogId.toString() !== blog._id.toString();
  });

  user.blogs = userBlogs;

  await user.save();
  await blog.remove();

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body;

  const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  });
  response.json(updated);
});

module.exports = blogsRouter;
