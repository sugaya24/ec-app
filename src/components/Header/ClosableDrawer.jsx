import React, { useCallback, useState, useEffect } from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Search,
  AddCircle,
  History,
  Person,
  ExitToApp,
} from '@material-ui/icons';
import { TextInput } from '../UIkit/index';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { signOut } from '../../reducks/users/operations';
import { db } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32,
  },
}));

export const ClosableDrawer = (props) => {
  const classes = useStyles();
  const { container } = props;
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');

  const inputKeyword = useCallback(
    (event) => {
      setKeyword(event.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event);
  };

  const [filters, setFilters] = useState([
    {
      func: selectMenu,
      label: 'All',
      id: 'all',
      value: '/',
    },
    {
      func: selectMenu,
      label: 'Men',
      id: 'men',
      value: '/?gender=men',
    },
    {
      func: selectMenu,
      label: 'Women',
      id: 'women',
      value: '/?gender=women',
    },
  ]);

  const menus = [
    {
      func: selectMenu,
      label: 'Register product',
      icon: <AddCircle />,
      id: 'register',
      value: '/product/edit',
    },
    {
      func: selectMenu,
      label: 'Order history',
      icon: <History />,
      id: 'history',
      value: '/order/history',
    },
    {
      func: selectMenu,
      label: 'Profile',
      icon: <Person />,
      id: 'profile',
      value: '/user/mypage',
    },
  ];

  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const category = snapshot.data();
          list.push({
            func: selectMenu,
            label: category.name,
            id: category.id,
            value: `/?category=${category.id}`,
          });
        });
        setFilters((prevState) => [...prevState, ...list]);
      });
  }, []);

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div className={classes.searchField}>
          <TextInput
            fullWidth={false}
            label={'Input keywords'}
            multiline={false}
            onChange={inputKeyword}
            required={false}
            rows={1}
            value={keyword}
            type="text"
          />
          <IconButton>
            <Search />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menus.map((menu) => (
            <ListItem
              button
              key={menu.id}
              onClick={(e) => menu.func(e, menu.value)}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
          <ListItem
            button
            key="logout"
            onClick={(e) => {
              dispatch(signOut());
              props.onClose(e);
            }}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {filters.map((filter) => {
            return (
              <ListItem
                button
                key={filter.id}
                onClick={(e) => filter.func(e, filter.value)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
