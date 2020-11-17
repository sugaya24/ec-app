import React, { useCallback, useEffect, useState } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  IconButton,
  TableCell,
} from '@material-ui/core';
import { CheckCircle, Delete, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { TextInput } from '../UIkit';

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

export const SetSizeArea = (props) => {
  const classes = useStyles();

  const [index, setIndex] = useState(0);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value);
    },
    [setSize]
  );

  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value);
    },
    [setQuantity]
  );

  const addSize = (index, size, quantity) => {
    if (size === '' || quantity === '') return false;

    if (index === props.sizes.length) {
      props.setSizes((prevState) => [
        ...prevState,
        { size: size, quantity: quantity },
      ]);
      setIndex(index + 1);
      setSize('');
      setQuantity(0);
    } else {
      const newSizes = [...props.sizes];
      newSizes[index] = { size: size, quantity: quantity };
      props.setSizes(newSizes);
      setIndex(newSizes.length);
      setSize('');
      setQuantity(0);
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((_, i) => i !== deleteIndex);
    props.setSizes(newSizes);
  };

  useEffect(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className={classes.iconCell}>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() =>
                          editSize(index, item.size, item.quantity)
                        }
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell className={classes.iconCell}>
                      <IconButton
                        className={classes.iconCell}
                        onClick={() => deleteSize(index)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label={'Size'}
            multiline={false}
            required={true}
            onChange={inputSize}
            rows={1}
            value={size}
            type={'text'}
          />
          <TextInput
            fullWidth={false}
            label={'Quantity'}
            multiline={false}
            required={true}
            onChange={inputQuantity}
            rows={1}
            value={quantity}
            type={'number'}
          />
        </div>
        <IconButton
          className={classes.checkIcon}
          onClick={() => addSize(index, size, quantity)}
        >
          <CheckCircle />
        </IconButton>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
