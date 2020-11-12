import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

export const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  console.log(selector.router);

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => dispatch(push('/'))}>Login</button>
    </div>
  );
};

export default Login;
