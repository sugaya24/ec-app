import React from 'react';
import styled from 'styled-components';

const ListImages = styled.div`
  margin: 0.5rem;
  width: calc(50% - 1rem);
  position: relative;
  overflow: hidden;
  /* width: 100%; */
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  > img {
    position: absolute;
    object-fit: cover;
    object-position: center;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
`;

export const ImagePreview = (props) => {
  return (
    <ListImages onClick={() => props.delete(props.id)}>
      <img src={props.path} alt="Preview image" />
    </ListImages>
  );
};

export default ImagePreview;
