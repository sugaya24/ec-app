import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import ImageArea from '../components/Products/ImageArea';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 1rem;
  height: auto;
  width: calc(100% - 2rem);
`;

export const ProductEdit = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');

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

  const categories = [
    { id: 'tops', name: 'Tops' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'pants', name: 'Pants' },
  ];

  const genders = [
    { id: 'all', name: 'All' },
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
  ];

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
          <PrimaryButton
            label={'Save a product'}
            onClick={() =>
              dispatch(saveProduct(name, description, category, gender, price))
            }
          />
        </div>
      </Container>
    </section>
  );
};

export default ProductEdit;
