import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import NoImage from '../../assets/no_image.png';
import 'swiper/css/swiper.css';
import styled from 'styled-components';

const ImageSlider = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
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

export const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    spaceBetween: 30,
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div>
          <img src={NoImage} alt="no image" />
        </div>
      ) : (
        images.map((image) => (
          <ImageSlider key={image.id}>
            <img src={image.path} alt="product image" />
          </ImageSlider>
        ))
      )}
    </Swiper>
  );
};

export default ImageSwiper;
