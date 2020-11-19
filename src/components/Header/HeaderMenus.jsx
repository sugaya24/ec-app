import React, { useEffect } from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { ShoppingCart, FavoriteBorder, Menu } from '@material-ui/icons';
import { getProductInCart, getUserId } from '../../reducks/users/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase';
import { fetchProductsInCart } from '../../reducks/users/operations';

export const HeaderMenus = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  let productsInCart = getProductInCart(selector);

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(uid)
      .collection('cart')
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case 'added':
              productsInCart.push(product);
              break;
            case 'modified':
              const index = productsInCart.findIndex(
                (product) => product.cartId === change.doc.id
              );
              productsInCart[index] = product;
            case 'removed':
              productsInCart = productsInCart.filter(
                (product) => product.cartId !== change.doc.id
              );
            default:
              break;
          }
        });

        dispatch(fetchProductsInCart(productsInCart));
      });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorder />
      </IconButton>
      <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
        <Menu />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
