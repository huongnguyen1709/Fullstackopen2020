import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      const blogs = action.data;
      blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
      return [...blogs];

    case 'NEW_BLOG':
      return [...state, action.data];

    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  };
};

export default reducer;
