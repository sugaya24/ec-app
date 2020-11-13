import React from 'react';
import { getUserId, getUserName } from '../reducks/users/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../reducks/users/operations';

export const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const userName = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>{uid}</p>
      <p>{userName}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};

export default Home;
