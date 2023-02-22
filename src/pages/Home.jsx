import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import lineLink from '../assets/images/home1.png';
import productsLink from '../assets/images/home2.png';
import SGS from '../assets/images/home3.png';
import tips from '../assets/images/home4.jpg';
import ProductAll from './ProductAll';
import { productsHot, productsNew, productsPrice } from '../api/products';
import { IsLoadingComponent as Loading } from '../components/common/IsLoading';

const StyledContainer = styled.div`
  margin: 0 15px;
`;
const StyledLinkWrapper = styled.div`
  width: 100%;
  padding: 15px 0;
  position: relative;
  &.produts-link,
  &.line-link {
    cursor: pointer;
  }
  img {
    width: 100%;
  }
  .light {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
  }
  .light:hover::before {
    content: '';
    width: 200px;
    height: 1000px;
    background: #ffffff;
    opacity: 0.3;
    transform: rotate(30deg);
    position: absolute;
    top: -200px;
    left: -400px;
    animation: lightMove 0.65s;
  }
  @keyframes lightMove {
    0% {
      left: -400px;
    }

    100% {
      left: 1400px;
    }
  }
`;
const StyledProductsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  max-width: 1300px;
`;

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [productHot, setProductHot] = useState([]);
  const [productNew, setProductNew] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const [productPriceOrigin, setProductPriceOrigin] = useState([]);
  const [sortSelect, setSortSelect] = useState({
    top: true
  });
  const [priceToggle, setPriceToggle] = useState('desc');

  // useEffect
  //抓熱銷排行
  useEffect(() => {
    setIsLoading(true);
    const getProductHotAsync = async () => {
      try {
        const resProductlHot = await productsHot();
        const onShelvesProductHot = resProductlHot?.filter(
          (product) => product.isOnShelves === 1
        );
        setProductHot(onShelvesProductHot);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    };
    getProductHotAsync();
    return;
  }, [setProductHot]);

  //抓最新商品
  useEffect(() => {
    setIsLoading(true);
    const getProductNewAsync = async () => {
      try {
        const resProductNew = await productsNew();
        const onShelvesProductNew = resProductNew?.filter(
          (product) => product.isOnShelves === 1
        );
        setProductNew(onShelvesProductNew);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    getProductNewAsync();
    return;
  }, [setProductNew]);

  //抓價格排序
  useEffect(() => {
    setIsLoading(true);
    const getProductPriceAsync = async () => {
      try {
        const resProductPrice = await productsPrice();
        const onShelvesProductPrice = resProductPrice?.filter(
          (product) => product.isOnShelves === 1
        );
        setProductPriceOrigin(onShelvesProductPrice);
        setProductPrice(onShelvesProductPrice);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    getProductPriceAsync();
    return;
  }, [setProductPriceOrigin]);

  // 點擊時，其他二個會變成 undefine 為 false，當為 true 時不改變
  const sortSelectToggle = (e) => {
    if (e.target.value === 'price') {
      if (priceToggle === 'asc') {
        setProductPrice(
          productPriceOrigin.sort((a, b) => {
            return a.price - b.price;
          })
        );
        const priceSortOrder = priceToggle === 'asc' ? 'desc' : 'asc';
        setPriceToggle(priceSortOrder);
      } else if (priceToggle === 'desc') {
        setProductPrice(
          productPriceOrigin.sort((a, b) => {
            return b.price - a.price;
          })
        );
        const priceSortOrder = priceToggle === 'asc' ? 'desc' : 'asc';
        setPriceToggle(priceSortOrder);
      }
    } else {
      setPriceToggle('desc');
      setProductPrice(
        productPriceOrigin.sort((a, b) => {
          return b.price - a.price;
        })
      );
    }
    if (sortSelect[e.target.value] === true) {
      return;
    } else {
      setSortSelect(() => ({
        [e.target.value]: !sortSelect[e.target.value]
      }));
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <StyledContainer>
        <StyledLinkWrapper className='line-link' style={{ padding: '0px' }}>
          <div className='light'></div>
          <img src={lineLink} alt='' />
        </StyledLinkWrapper>
        <StyledLinkWrapper
          className='produts-link'
          onClick={() => navigate('/product/all')}
        >
          <div className='light'></div>
          <img src={productsLink} alt='' />
        </StyledLinkWrapper>
        <StyledLinkWrapper className='SGS-img'>
          <img src={SGS} alt='' />
        </StyledLinkWrapper>
        <StyledLinkWrapper className='tips-img'>
          <img src={tips} alt='' />
        </StyledLinkWrapper>
      </StyledContainer>
      <StyledProductsContainer>
        <ProductAll
          productHot={productHot}
          productNew={productNew}
          productPrice={productPrice}
          priceToggle={priceToggle}
          sortSelect={sortSelect}
          sortSelectToggle={sortSelectToggle}
        />
      </StyledProductsContainer>
    </>
  );
};

export default Home;
