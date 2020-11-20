import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SetSizeArea, ImageArea } from '../components/Products/index';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';
import styled from 'styled-components';
import { db } from '../firebase/index';

const Container = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 1rem;
  height: auto;
  width: calc(100% - 2rem);
`;

export const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('/product/edit')[1];
  if (id !== '') {
    id = id.split('/')[1];
  }

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );
  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );
  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  // const categories = [
  //   { id: 'tops', name: 'Tops' },
  //   { id: 'shirts', name: 'Shirts' },
  //   { id: 'pants', name: 'Pants' },
  // ];

  const genders = [
    { id: 'all', name: 'All' },
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
  ];

  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setName(data.name);
          setImages(data.images);
          setGender(data.gender);
          setCategory(data.category);
          setPrice(data.price);
          setDescription(data.description);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setCategories(list);
      });
  }, []);

  return (
    <section>
      <Container>
        <h2>Register product</h2>
        <ImageArea images={images} setImages={setImages} />
        <div>
          <TextInput
            fullWidth={true}
            label={'Product name'}
            multiline={false}
            required={true}
            onChange={inputName}
            rows={1}
            value={name}
            type={'text'}
          />
          <TextInput
            fullWidth={true}
            label={'Description'}
            multiline={true}
            required={true}
            onChange={inputDescription}
            rows={5}
            value={description}
            type={'text'}
          />
          <SelectBox
            label={'Category'}
            required={true}
            options={categories}
            select={setCategory}
            value={category}
          />
          <SelectBox
            label={'Gender'}
            required={true}
            options={genders}
            select={setGender}
            value={gender}
          />
          <TextInput
            fullWidth={true}
            label={'Price'}
            multiline={false}
            required={true}
            onChange={inputPrice}
            rows={1}
            value={price}
            type={'number'}
          />
          <SetSizeArea sizes={sizes} setSizes={setSizes} />
          <PrimaryButton
            label={'Save a product'}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images,
                  sizes
                )
              )
            }
          />
        </div>
      </Container>
    </section>
  );
};

export default ProductEdit;
