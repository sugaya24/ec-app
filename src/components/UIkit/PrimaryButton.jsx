import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  button: {
    background: '#4dd0e1',
    color: '#000000',
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
});

export const PrimaryButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;