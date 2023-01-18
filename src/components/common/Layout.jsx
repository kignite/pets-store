import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import GoTop from "./GoTop";
import ChatRobot from "./ChatRobot";

import { CartIcon, SearchIcon } from "../../assets/icons";
import LoginModal from "./LoginModal";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1140px;
  margin: 0 auto;
`;

const StyledButtonWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  gap: 10px 0;
  .search-bar {
    display: flex;
    flex-direction: row-reverse;

    .none {
      display: none;
    }
    .active {
      display: unset;
    }
  }
  .cart-button,
  .search {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--button-background);
    cursor: pointer;
  }
  .cart-button {
    position: relative;
  }
  .count {
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: var(--red-dark);
    color: var(--white);
    transform: translate(50%, -50%);
  }
`;

const StyledSearchWrapper = styled.div`
  width: 72px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
  margin: auto;
  background-color: var(--button-background);
  border-radius: 4px;
  h6,
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 24px;
    color: var(--white);
  }
  h6 {
    border-bottom: 1px solid var(--gray);
  }
  span {
    cursor: pointer;
  }
  .product-wrapper {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 5px 0;
    padding: 5px;
  }
  .product {
    width: 60px;
    height: 60px;
    background-size: cover;
    background-image: url("https://picsum.photos/id/1020/600/400");
    cursor: pointer;
  }
`;


const Layout = () => {
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  
const handleToggleLoginModal = () => {
  setIsOpenLoginModal(!isOpenLoginModal);
}

  return (
    <>
      <StyledContainer onClick={() => setSearchBarActive(false)}>
        <Header handleToggleLoginModal={handleToggleLoginModal} />
        <Outlet />
        <StyledButtonWrapper>
          <button className='cart-button'>
            <CartIcon />
          </button>
          <div className='count'>0</div>
          <span className='search-bar'>
            <label
              className='search'
              for='search-input'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSearchBarActive(!searchBarActive);
              }}
            >
              <SearchIcon />
            </label>
            <input
              type='text'
              id='search-input'
              className={searchBarActive ? "active" : "none"}
            />
          </span>
          <ul className='popular-items'>
            <li className='popular-item'>1</li>
            <li className='popular-item'>2</li>
            <li className='popular-item'>3</li>
            <li className='popular-item'>4</li>
          </ul>
        </StyledButtonWrapper>
        <StyledSearchWrapper>
          <h6>瀏覽紀錄</h6>
          <div className='product-wrapper'>
            <div className='product'></div>
            <div className='product'></div>
            <div className='product'></div>
          </div>
          <span>清除全部</span>
        </StyledSearchWrapper>
        <ChatRobot/>
        <GoTop />
      </StyledContainer>
      <Footer />
      {isOpenLoginModal && (
        <LoginModal
          isOpenLoginModal={isOpenLoginModal}
          setIsOpenLoginModal={setIsOpenLoginModal}
          handleToggleLoginModal={handleToggleLoginModal}
        />
      )}
    </>
  );
};

export default Layout;
