import React from 'react';
import {
  Divider,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { getUserId } from '../../reducks/users/selectors';
import { db } from '../../firebase/index';

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: 'cover',
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: '100%',
  },
});

export const CartListItem = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  const image = props.product.images[0].path;
  const name = props.product.name;
  const price = props.product.price.toLocaleString();
  const size = props.product.size;

  const removeProductFromCart = (id) => {
    return db.collection('users').doc(uid).collection('cart').doc(id).delete();
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="Product image" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText primary={name} secondary={`Size: ${size}`} />
          <ListItemText primary={`${price}$`} />
        </div>
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <Delete />
        </IconButton>
        <Divider />
      </ListItem>
    </>
  );
};

export default CartListItem;
