import React from 'react';
import { Route, Switch } from 'react-router';
import { Home, SignUp, SignIn } from './templates';

export const Router = () => {
  return (
    <Switch>
      <Route exact path="(/)?" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
    </Switch>
  );
};

export default Router;
