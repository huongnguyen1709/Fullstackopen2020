import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      const blogs = action.data;
      blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
      return [...blogs];

    case 'NEW_BLOG':
      return [...state, action.data];

    case 'ADD_LIKE_BLOG':
      state.find((blog) => blog.id === action.id).likes++;
      return [...state];

    case 'DELETE_BLOG':
      state.map((blog) => console.log(blog.id));
      state = state.filter((blog) => blog.id !== action.id);
      return [...state];

    case 'ADD_COMMENT':
      state.find((blog) => blog.id === action.id).comments.push(action.comment);

      return [...state];

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

export const addLikeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.updateLikes(blog);
    dispatch({
      type: 'ADD_LIKE_BLOG',
      id: blog.id,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch({
      type: 'DELETE_BLOG',
      id,
    });
  };
};

export const addCommentToBlog = (blog, comment) => {
  return async (dispatch) => {
    await blogService.addComment(blog, comment);
    dispatch({
      type: 'ADD_COMMENT',
      id: blog.id,
      comment,
    });
  };
};

export default reducer;
