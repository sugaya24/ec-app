import React, { useCallback } from 'react';
import { IconButton } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/styles';
import { storage } from '../../firebase/index';
import ImagePreview from './ImagePreview';
import styled from 'styled-components';

const Thumbnail = styled.div`
  display: flex;
  flex-flow: wrap;
`;

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

export const ImageArea = (props) => {
  const classes = useStyles();
  const images = props.images;

  const deleteImage = useCallback(
    async (id) => {
      const ret = window.confirm('Are you sure to delete this image?');
      if (!ret) {
        return false;
      } else {
        const newImages = images.filter((image) => image.id !== id);
        props.setImages(newImages);
        console.log(storage.ref('images'));
        return storage.ref('images').child(id).delete();
      }
    },
    [images]
  );

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      let blob = new Blob(file, { type: 'image/jpeg' });

      // Generate random 16 digits strings
      const S =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint16Array(N)))
        .map((n) => S[n % S.length])
        .join('');
      console.log('event', fileName);

      const uploadRef = storage.ref('images').child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
            console.log(downloadURL);
            const newImage = { id: fileName, path: downloadURL };
            props.setImages((prevState) => [...prevState, newImage]);
          })
          .catch((err) => console.log(err));
      });
    },
    [props.setImages]
  );

  return (
    <div>
      <Thumbnail>
        {props.images.length > 0 &&
          props.images.map((image) => (
            <ImagePreview
              delete={deleteImage}
              path={image.path}
              key={image.id}
              id={image.id}
            />
          ))}
      </Thumbnail>
      <div>
        <span>Register new product</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input
              style={{ display: 'none' }}
              type={'file'}
              id={'image'}
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
