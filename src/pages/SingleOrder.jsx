import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { singleOrder } from "../api/adminAuth";

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  border: 1px solid #ddd;
`;

const StyledTitle = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 2px solid #ddd;
`;
const StyledOrderList = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 10px;
  gap: 10px;
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-header);
  }
  .wrapper-title,
  .wrapper-content {
    display: flex;
    flex-flow: row;
  }
  .wrapper-title {
    font-size: 16px;
    font-weight: 700;
  }
  .wrapper-content {
    font-size: 16px;
    font-weight: 500;
  }
  .buying-information {
    justify-content: space-between;
  }
  .products {
    display: grid;
    grid-template-columns: 40% 1fr;
    .wrapper {
      display: grid;
      grid-template-columns: 3fr 6fr 1fr;
      @media screen and (max-width: 577px) {
        grid-template-columns: 3fr 3fr 2fr;
      }
      p {
        display: flex;
        justify-content: center;
      }
    }
  }
  .sender,
  .addressee {
    width: 100%;
    display: grid;
    grid-template-columns: 100px repeat(2, 200px) 1fr;
    @media screen and (max-width: 768px) {
      grid-template-columns: 100px repeat(2, 1fr);
      gap: 10px;
      .remark {
        display: none;
      }
    }
    & p ~ p {
      display: flex;
      justify-content: center;
    }
    & P:nth-last-child(1) {
      flex-flow: wrap;
      word-wrap: break-all;
    }
  }
  .addressee {
    grid-template-columns: 100px 200px 1fr;
    @media screen and (max-width: 768px) {
      grid-template-columns: 60px 110px 1fr;
    }
  }
  .count {
    display: flex;
    justify-content: space-between;
    padding-right: 5px;
    p {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .remark-md {
    display: none;
  }
  @media screen and (max-width: 768px) {
    .remark-md {
      display: flex;
      flex-flow: column;
      gap: 10px;
      padding-top: 15px;
    }
  }
`;

const SingleOrder = () => {
  const [order, setOrder] = useState({});
  const params = useParams()
  let total = order?.products?.reduce(
    (total, item) => total + Number(item.subTotal),
    0
  );
  
  useEffect(() => {
    const getOrdersAllAsync = async () => {
      try {
        const resOrder = await singleOrder(params.orderId);
        setOrder(resOrder.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOrdersAllAsync();
    return;
  }, [params.orderId,setOrder]);

  return (
    <StyledContainer>
      <StyledTitle>
        <h2>訂單編號：</h2>
        <p>{order?.orderNumber}</p>
      </StyledTitle>
      <StyledOrderList>
        <StyledWrapper>
          <h3>購買資訊</h3>
          <div className='wrapper-title buying-information'>
            <p>付款方式</p>
            <p>運送方式</p>
            <p>處理狀態</p>
          </div>
          <div className='wrapper-content buying-information'>
            <p>{order?.Payment?.type}</p>
            <p>{order?.Delivery?.type}</p>
            <p>撿貨中</p>
          </div>
          <hr />
          <div className='wrapper-title products'>
            <p>購買品項</p>
            <div className='wrapper'>
              <p>數量</p>
              <p>單價</p>
              <p>小計</p>
            </div>
          </div>
          {order?.products?.map((product) => {
            return (
              <div key={product.id} className='wrapper-content products'>
                <p>{product.Product.name}</p>
                <div className='wrapper'>
                  <p>{product.orderQuantity}</p>
                  <p>${product.Product.price}</p>
                  <p>${product.subTotal}</p>
                </div>
              </div>
            );
          })}
          <div className='count'>
            <p>總計</p>
            <p>${total}</p>
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <h3>購買者資料</h3>
          <hr />
          <div className='wrapper-title sender'>
            <p>姓名</p>
            <p>電話</p>
            <p>email</p>
            <p className='remark'>備註</p>
          </div>
          <div className='wrapper-content sender'>
            <p>{order.purchaserName}</p>
            <p>{order.purchaserPhone}</p>
            <p>{order.purchaserEmail}</p>
            <p className='remark'>{order.comment}</p>
          </div>
          <div className='remark-md'>
            <p className='wrapper-title'>備註</p>
            <p className='wrapper-content'>{order.comment}</p>
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <h3>收件者資料</h3>
          <hr />
          <div className='wrapper-title addressee'>
            <p>姓名</p>
            <p>電話</p>
            <p>地址</p>
          </div>
          <div className='wrapper-content addressee'>
            <p>{order.receiverName}</p>
            <p>{order.receiverPhone}</p>
            <p>{order.receiverAddress}</p>
          </div>
        </StyledWrapper>
      </StyledOrderList>
    </StyledContainer>
  );
};

export default SingleOrder;
