import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db, FirebaseTimestamp } from '../firebase/index';
import { makeStyles } from '@material-ui/core/styles';
import HTMLReactParser from 'html-react-parser';
import { ImageSwiper, SizeTable } from '../components/Products/index';
import { addProductToCart } from '../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  section: {
    margin: '0 auto',
    maxWidth: 960,
    position: 'relative',
    padding: '0 1rem',
    textAlign: 'center',
    width: '100%',
  },
  product: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
}));

const returnCodeToBr = (text) => {
  if (text === '') return text;
  return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
};

export const ProductDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split('/product/')[1];

  const [product, setProduct] = useState(null);

  useEffect(() => {
    db.collection('products')
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setProduct(data);
      });
  }, []);

  const addProduct = useCallback(
    (selectedSize) => {
      const timestamp = FirebaseTimestamp.now();
      dispatch(
        addProductToCart({
          added_at: timestamp,
          description: product.description,
          gender: product.gender,
          images: product.images,
          name: product.name,
          price: product.price,
          productId: product.id,
          quantity: 1,
          size: selectedSize,
        })
      );
    },
    [product]
  );

  return (
    <section className={classes.section}>
      {product && (
        <div className={classes.product} key={product.name}>
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2>{product.name}</h2>
            <p>{product.price.toLocaleString()}$</p>
            <SizeTable sizes={product.sizes} addProduct={addProduct} />
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
