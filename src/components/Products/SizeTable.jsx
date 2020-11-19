import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  IconButton,
  TableCell,
} from '@material-ui/core';
import { ShoppingCart, FavoriteBorder } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

export const SizeTable = (props) => {
  const classes = useStyles();

  const sizes = props.sizes;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((size) => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity} left
                </TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity > 0 ? (
                    <IconButton onClick={() => props.addProduct(size.size)}>
                      <ShoppingCart />
                    </IconButton>
                  ) : (
                    <div>SOLD OUT</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorder />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
