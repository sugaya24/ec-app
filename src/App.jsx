import React from 'react';
import { Header } from './components/Header/index';
import Router from './Router';
import styled from 'styled-components';

const Main = styled.main`
  padding: 96px 0;
`;

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Router />
      </Main>
    </>
  );
};

export default App;
