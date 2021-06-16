import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Input,
  InputLabel,
} from '@material-ui/core';

import {
  addLikeBlog,
  deleteBlog,
  addCommentToBlog,
} from '../reducers/blogReducer';

const Blog = ({ blog, loggedInUserID }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState('');

  const inputStyle = {
    color: '#4169E1',
    marginTop: '40px',
    fontSize: 20,
  };

  const buttonStyle = {
    marginTop: '30px',
    display: 'block',
  };

  const handleDelete = async () => {
    console.log(blog.id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
      history.push('/');
    }
  };

  const authorAction = () => {
    if (blog.user) {
      const blogUserID = blog.user;

      if (loggedInUserID === blogUserID) {
        return (
          <Button
            onClick={handleDelete}
            variant='contained'
            color='secondary'
            size='small'
          >
            remove
          </Button>
        );
      }
      if (blog.user.id) {
        const blogUserID = blog.user.id;
        if (loggedInUserID === blogUserID) {
          return (
            <Button
              onClick={handleDelete}
              variant='contained'
              color='secondary'
              size='small'
            >
              remove
            </Button>
          );
        }
      }
    } else return null;
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h3>{blog.title}</h3>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <a href={blog.url}>{blog.url}</a>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                likes {blog.likes}
                &nbsp;
                <button onClick={() => dispatch(addLikeBlog(blog))}>
                  like
                </button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>added by {blog.author}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <InputLabel style={inputStyle} shrink htmlFor='comment'>
        comments
      </InputLabel>
      <Input
        id='comment'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></Input>

      <Button
        style={buttonStyle}
        type='submit'
        variant='contained'
        color='primary'
        size='small'
        onClick={() => {
          dispatch(addCommentToBlog(blog, comment));
          setComment('');
        }}
      >
        add comment
      </Button>

      <ul>
        {blog &&
          blog.comments &&
          blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
      {authorAction()}
    </div>
  );
};

export default Blog;
