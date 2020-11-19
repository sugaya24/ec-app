import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductInCart } from '../reducks/users/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { CartListItem } from '../components/Products';
import { List, Divider } from '@material-ui/core';
import { PrimaryButton, TextDetail } from '../components/UIkit';
import { orderProduct } from '../reducks/products/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 960,
    margin: '0 auto',
  },
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      width: 512,
    },
  },
  orderBox: {
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    height: 'fit-content',
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288,
  },
  gridRow: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  button: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    marginTop: 24,
  },
}));

export const OrderConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductInCart(selector);

  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productsInCart]);

  const shippingFee = subtotal >= 100 ? 0 : 2;
  const tax = subtotal * 0.12;
  const total = subtotal + shippingFee + tax;

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total));
  }, [productsInCart, total]);

  return (
    <section className={classes.root}>
      <h2>Order Confirmation</h2>
      <div className={classes.gridRow}>
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product) => (
                <CartListItem key={product.cartId} product={product} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label={'Total(without Tax)'}
            value={`$ ${subtotal.toLocaleString()}`}
          />
          <TextDetail label={'Tax'} value={`$ ${tax.toLocaleString()}`} />
          <TextDetail
            label={'Shipping fee'}
            value={`$ ${shippingFee.toLocaleString()}`}
          />
          <Divider />
          <TextDetail
            label={'Total(with Tax)'}
            value={`$ ${total.toLocaleString()}`}
          />
          <div className={classes.button}>
            <PrimaryButton label={'Place an order'} onClick={order} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;
