import React, { useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';

import "../css/checkout.css"
import styles from '../css/checkout.module.css'
import { format } from 'date-fns';
import axios from 'axios';
import Swal from 'sweetalert2';





export default function Checkout({ productsInCart, setproductsInCart }) {



    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    console.log("products",productsInCart)

    useEffect(() => {
        const storedData = localStorage.getItem("key");
        setUsername(storedData);
      }, []);


      const totalPrice = productsInCart.reduce(function (total, prod) {
        return total + (prod.product.price * prod.count) - ((prod.product.price * prod.count) * (prod.product.discount / 100));
      }, 0) 
    const formattedDate = format(new Date(), 'dd-MM-yyyy');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const orderResponse = await axios.post("http://localhost:8080/api/orders", {
            username: username,
            address: address
          });
          
          for (let productInCart of productsInCart) {
            const detailReponse = await axios.post('http://localhost:8080/api/orderDetails', {
              order: orderResponse.data,
              price: productInCart.product.price,
              product: productInCart.product,
              quantity: productInCart.count
            });
            console.log("detail: ",detailReponse);
          }
          
          Swal.fire(
            'Successful order creation!',
            'Success',
            'success'
          )
          setproductsInCart([]);
          navigate('/user/products');
        } catch (error) {
          // Xử lý và hiển thị thông báo lỗi cho người dùng
          console.log('Lỗi khi thêm đơn đặt hàng:', error);
          alert('Đã có lỗi xảy ra khi thêm đơn đặt hàng');
        }
      };
      //CHECKOUT VPN
      const OnSubmitPay = async () => {
        const dataPayment = {
          amount: totalPrice,
          vnpOrderInfo: "information",
          vnpReturnUrl: "http://localhost:3000/",
        };
    
        const responsePayment = await axios.post(
          "http://localhost:8080/create-payment",
          dataPayment
        );
        const linkPayment = await responsePayment.data;
        window.location.href = linkPayment;
      };

    return (
        <div>
            <div className="subject" style={{ marginTop: 100 }}>
                DailyUI #002 <br />
                <strong>Credit Card Checkout</strong>
            </div>

            <div className="checkout">
                <div className={styles.order}>
                    <h2 style={{ fontSize: '28px', letterSpacing: '-2px', color: '#6d819c', textAlign: 'center', lineHeight: '2.8' }}>Checkout</h2>
                    <h4 style={{ fontSize: '16px', color: '#7495aa', letterSpacing: '1px', lineHeight: '2' }}>Sản Phẩm</h4>
                    <ul className="order-list">
                        {productsInCart.map(item => (
                        <div key={item.product.id}>
                            <li style={{ lineHeight: 200 }}>
                                <img src={`http://localhost:8080/api/products/get-image/${item.product.imageName}`} alt='iamge' className="img-fluid" />
                                <h4 style={{ fontSize: '16px', color: '#7495aa', letterSpacing: '1px', lineHeight: '2' }}>{item.product.name}</h4>
                                <h5 style={{ fontSize: '11px', fontWeight: '700', color: '#1d2429', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                    <span style={{ marginLeft: '87px' }}>
                                        {`${item.product.price - (item.product.price * (item.product.discount/100))}$  x  ${item.count}`} 
                                    </span>
                                </h5>
                            </li>
                        </div>
                        ))}                   
                    </ul>
                    <h2 style={{ fontSize: '28px', letterSpacing: '-2px', color: '#6d819c', textAlign: 'center', lineHeight: '2.8' }}>TOTAL</h2>
                    <h1 style={{ fontSize: '42px', color: '#6d819c', textAlign: 'left' }}>
                        {totalPrice}$
                    </h1>
                </div>
                <h2 style={{ fontSize: '28px', letterSpacing: '-2px', color: '#6d819c', textAlign: 'center', lineHeight: '2.8' }}>Payment</h2>
                <div id="payment" className="payment">
                    <div className={styles.card} >
                        <div className="card-content">
                            <svg
                                id="logo-visa"
                                enableBackground="new 0 0 50 70"
                                height="70px"
                                version="1.1"
                                viewBox="0 0 50 50"
                                width="70px"
                                xmlSpace="preserve"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <g>
                                    <g>
                                        <polygon
                                            clipRule="evenodd"
                                            fill="#f4f5f9"
                                            fillRule="evenodd"
                                            points="17.197,32.598 19.711,17.592 23.733,17.592     21.214,32.598   "
                                        />
                                        <path
                                            clipRule="evenodd"
                                            d="M35.768,17.967c-0.797-0.287-2.053-0.621-3.596-0.621    c-3.977,0-6.752,2.029-6.776,4.945c-0.023,2.154,1.987,3.358,3.507,4.08c1.568,0.738,2.096,1.201,2.076,1.861    c0,1.018-1.238,1.471-2.395,1.471c-1.604,0-2.455-0.232-3.773-0.787l-0.53-0.248l-0.547,3.348    c0.929,0.441,2.659,0.789,4.462,0.811c4.217,0,6.943-2.012,6.979-5.135c0.025-1.692-1.053-2.999-3.369-4.071    c-1.393-0.685-2.246-1.134-2.246-1.844c0-0.645,0.723-1.306,2.295-1.306c1.314-0.024,2.268,0.271,3.002,0.58l0.365,0.167    L35.768,17.967z"
                                            fill="#f4f5f9"
                                            fillRule="evenodd"
                                        />
                                        <path
                                            clipRule="evenodd"
                                            d="M46.055,17.616h-3.102c-0.955,0-1.688,0.272-2.117,1.24    l-5.941,13.767h4.201c0,0,0.688-1.869,0.852-2.262c0.469,0,4.547,0,5.133,0c0.123,0.518,0.49,2.262,0.49,2.262h3.711    L46.055,17.616 M41.1,27.277c0.328-0.842,1.609-4.175,1.609-4.175c-0.041,0.043,0.328-0.871,0.529-1.43l0.256,1.281    c0,0,0.773,3.582,0.938,4.324H41.1z"
                                            fill="#f4f5f9"
                                            fillRule="evenodd"
                                        />
                                        <path
                                            clipRule="evenodd"
                                            d="M13.843,17.616L9.905,27.842l-0.404-2.076    c-0.948-2.467-2.836-4.634-5.53-6.163l3.564,12.995h4.243l6.312-14.982H13.843z"
                                            fill="#f4f5f9"
                                            fillRule="evenodd"
                                        />
                                        <path
                                            clipRule="evenodd"
                                            d="M7.232,17.174H0.755l-0.037,0.333    c5.014,1.242,8.358,4.237,9.742,7.841l-1.42-6.884C8.798,17.507,8.105,17.223,7.232,17.174L7.232,17.174z"
                                            fill="#f4f5f9"
                                            fillRule="evenodd"
                                        />
                                    </g>
                                </g>
                            </svg>
                            <h5 style={{ fontSize: '11px', fontWeight: '700', color: '#1d2429', letterSpacing: '1px', textTransform: 'uppercase' }}>Card Number</h5>
                            <h6 id="label-cardnumber">9987 1252 6658 7799</h6>
                            <h5 style={{ fontSize: '11px', fontWeight: '700', color: '#1d2429', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                Expiration<span style={{marginLeft: '70px'}}>CVC</span>
                            </h5>
                            <h6 id="label-cardexpiration">
                                12 / 2020<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;798</span>
                            </h6>
                        </div>
                    </div>
                    <div className="card-form">
                        <div className="row">
                            <div className="form-group col-sm-6">
                                <div>Purchaser</div>
                                <div className="form-control" id="username">
                                {username}
                                </div>
                            </div>
                            <div className="form-group col-sm-6">
                                <div>Order Date</div>
                                <div className="form-control">{formattedDate}</div>
                            </div>
                        </div>
                        <div>Shipping Address:</div>
                        <input className="form-control" value={address} onChange={(e) => setAddress(e.target.value)}
/>
                    </div>
                    <button className="button-cta" title="Confirm your purchase" onClick={handleSubmit}>
                        <span>PURCHASE</span>
                    </button>
                    <button onClick={OnSubmitPay}>
                        <span>VPN</span>
                    </button>
                </div>
            </div>

        </div>
    )
}
