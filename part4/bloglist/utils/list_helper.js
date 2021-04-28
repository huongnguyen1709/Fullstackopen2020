var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = blogs.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.likes;
  }, 0);
  return sum;
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => {
    return blog.likes;
  });

  const mostLikes = likes.reduce((previousLikes, currentLikes) => {
    return currentLikes > previousLikes ? currentLikes : previousLikes;
  }, 0);

  const favoriteBlog = blogs.find((blog) => blog.likes === mostLikes);
  const blog = {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };

  return blog;
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => {
    return blog.author;
  });
  let writtenAuthor = _.countBy(authors);

  const authorsNum = Object.entries(writtenAuthor);

  const mostBlogs = authorsNum.reduce((accumulator, currentValue) => {
    return currentValue[1] > accumulator ? currentValue[1] : accumulator;
  }, 0);

  const author = authorsNum.find((author) => author[1] === mostBlogs);
  const topAuthor = {
    author: author[0],
    blogs: author[1],
  };

  return topAuthor;
};

const mostLikes = (blogs) => {
  const authorsNumOfLikes = blogs.map((blog) => {
    return {
      author: blog.author,
      likes: blog.likes,
    };
  });

  var authorTotalOfLikes = [];
  authorsNumOfLikes.reduce(function (res, value) {
    if (!res[value.author]) {
      res[value.author] = { author: value.author, likes: 0 };
      authorTotalOfLikes.push(res[value.author]);
    }
    res[value.author].likes += value.likes;
    return res;
  }, {});

  var result = {};
  authorTotalOfLikes.reduce(function (res, value) {
    if (value.likes > res) {
      result = value;
      return value.likes;
    }
  }, 0);
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
