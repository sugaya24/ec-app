import React from 'react';
import { Divider } from '@material-ui/core';
import { TextDetail } from '../UIkit';
import { OrderedProducts } from '../Products';

const datetimeToString = (datetime) => {
  return (
    datetime.getFullYear() +
    '-' +
    ('00' + (datetime.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + datetime.getDate()).slice(-2) +
    ' ' +
    ('00' + datetime.getHours()).slice(-2) +
    ':' +
    ('00' + datetime.getMinutes()).slice(-2) +
    ':' +
    ('00' + datetime.getSeconds()).slice(-2)
  );
};

const dateToString = (date) => {
  return (
    date.getFullYear() +
    '-' +
    ('00' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + date.getDate()).slice(-2)
  );
};

const OrderHistoryItem = (props) => {
  const order = props.order;
  const orderedDatetime = datetimeToString(order.updated_at.toDate());
  const shippingDate = dateToString(order.shipping_date.toDate());
  const price = `$ ${order.amount.toLocaleString()}`;

  return (
    <div>
      <TextDetail label={'Order Id'} value={order.id} />
      <TextDetail label={'Order date'} value={orderedDatetime} />
      <TextDetail label={'Estimated shipping date'} value={shippingDate} />
      <TextDetail label={'Order amount'} value={price} />
      {order.products.length > 0 && (
        <OrderedProducts products={order.products} />
      )}
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
