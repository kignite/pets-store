import React, { useState } from 'react';
import styled from 'styled-components';
import { CartIcon } from '../assets/icons/index';
import { Link } from 'react-router-dom';
import ProductPopCart from './ProductPopCart';

const StyledCard = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: start;
  aspect-ratio: 3/4;

  .product {
    width: 100%;
    aspect-ratio: 1/1;
    background-size: cover;
    background-image: url('https://picsum.photos/id/20/400');
  }

  .wrapper {
    display: flex;
    flex-flow: column;
    gap: 5px 0;
    padding: 10px;
    width: 100%;
  }
  .title {
    text-align: left;
    font-size: 16px;
    height: 48px;
    line-height: 24px;
    color: #333;
  }
  .price {
    text-align: left;
    font-family: Roboto, sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-decoration: line-through;
    color: var(--gray-dark);
  }
  .discount-price {
    text-align: left;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-red);
  }

  @media screen and (max-width: 768px) {
    .title {
      font-size: 18px;
      line-height: 24px;
    }
    .price {
      font-size: 12px;
    }
    .discount-price {
      font-size: 18px;
    }
  }
`;

const Button = styled.div`
  position: absolute;
  bottom: 105px;
  right: 10px;
  display: flex;
  justify-content: end;
  align-items: center;

  .addCart {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 35px;
    height: 35px;
    background-color: var(--red);
    border-width: 1px;
    background-color: ${(props) =>
      props.active ? 'var(--white)' : 'var(--red)'};
    color: ${(props) => (props.active ? ' var(--red)' : 'var(--white)')};
    border: ${(props) => (props.active ? '2px solid var(--red)' : '')};
    font-size: 20px;
    font-weight: 400;
    border-radius: 10%;
    &:hover {
      cursor: pointer;
    }
  }
  @media screen and (max-width: 768px) {
    bottom: 120px;
    right: 10px;
    .addCart {
      width: 30px;
      height: 30px;
    }
  }
`;

export const ProductItem = ({ id, price, image, name }) => {
  const [addCartPop, setAddCartPop] = useState(false);

  const handleToggleCartModal = () => {
    setAddCartPop(!addCartPop);
  };

  return (
    <>
      <StyledCard id={id}>
        <Link
          className='product'
          style={{ backgroundImage: `url('${image}')` }}
          to={`/product/detail/${id}`}
        />
        <Button onClick={handleToggleCartModal}>
          <div className='addCart'>
            <CartIcon style={{ fontSize: '18px', cursor: 'pointer' }} />
          </div>
        </Button>
        <div className='wrapper'>
          <Link to={`/product/detail/${id}`}>
            <h4 className='title'>{name}</h4>
            <div className='price'>${price}</div>
            <div className='discount-price'>${Math.floor(price * 0.8)}</div>
          </Link>
        </div>
      </StyledCard>
      {addCartPop && (
        <ProductPopCart
          id={id}
          name={name}
          price={price}
          handleToggleCartModal={handleToggleCartModal}
        />
      )}
    </>
  );
};
