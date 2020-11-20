import React from 'react';
import { Route, Switch } from 'react-router';
import {
  SignUp,
  SignIn,
  Reset,
  ProductEdit,
  ProductList,
  ProductDetail,
  CartList,
  OrderConfirm,
  OrderHistory,
} from './templates';
import Auth from './Auth';

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signin/reset" component={Reset} />
      <Auth>
        <Route exact path={'(/)?'} component={ProductList} />
        <Route exact path={'/product/:id'} component={ProductDetail} />
        <Route path={'/product/edit(/:id)?'} component={ProductEdit} />
        <Route exact path={'/cart'} component={CartList} />
        <Route exact path={'/order/confirm'} component={OrderConfirm} />
        <Route exact path={'/order/history'} component={OrderHistory} />
      </Auth>
    </Switch>
  );
};

export default Router;
