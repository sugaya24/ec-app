import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { ShoppingCart, FavoriteBorder, Menu } from '@material-ui/icons';

export const HeaderMenus = (props) => {
  return (
    <>
      <IconButton>
        <Badge badgeContent={3} color="secondary">
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
