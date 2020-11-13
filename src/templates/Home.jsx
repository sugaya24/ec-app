import React from 'react';
import { getUserId, getUserName } from '../reducks/users/selectors';
import { useSelector } from 'react-redux';

export const Home = () => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const userName = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>{uid}</p>
      <p>{userName}</p>
    </div>
  );
};

export default Home;
