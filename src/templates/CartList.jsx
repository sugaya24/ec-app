import React, { useCallback } from 'react';
import { Divider, List } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { CartListItem } from '../components/Products';
import { PrimaryButton, GreyButton } from '../components/UIkit';
import { push } from 'connected-react-router';
import { getProductInCart } from '../reducks/users/selectors';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 512,
    width: '100%',
    margin: '0 auto',
  },
  buttonGroup: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    marginTop: 24,
  },
});

export const CartList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push('/'));
  }, []);

  return (
    <section className={classes.root}>
      <h2>Shopping Cart</h2>
      <List>
        {productsInCart.length > 0 &&
          productsInCart.map((product) => (
            <CartListItem key={product.cartId} product={product} />
          ))}
      </List>
      <Divider />
      <div className={classes.buttonGroup}>
        <PrimaryButton label={'Proceed to checkout'} onClick={goToOrder} />
        <GreyButton label={'Continue shopping'} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
