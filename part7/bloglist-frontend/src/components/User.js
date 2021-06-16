import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#2f4f4f',
      color: theme.palette.common.white,
      fontSize: 16,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  return (
    <div>
      <h3>{user.name}</h3>
      <p>
        <strong>added blogs</strong>
      </p>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {user &&
              user.blogs &&
              user.blogs.map((blog) => (
                <StyledTableRow key={blog.id}>
                  <StyledTableCell>{blog.title}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
