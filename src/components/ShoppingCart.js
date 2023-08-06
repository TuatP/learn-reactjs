import React from 'react'
import "../css/shoppingCart.css"
import {FaTimes} from "react-icons/fa"
import { Link } from 'react-router-dom';




function ShoppingCart({
    visibilty,
    onProductRemove,
    onClose,
    onQuantityChange,
    productsInCart

}) {
    //total price
    const totalPrice = productsInCart.reduce(function(total, prod){
        return total + prod.product.price * prod.count;
    },0)
    console.log(productsInCart);
  return (
    
    <div className='modal' style={{display: visibilty ? "block" : "none"}}>
        <div className='shoppingCart'>
        <div className='header'>
            <h2>Shopping Cart</h2>
            <button className='btn close-btn' onClick={onClose} style={{marginLeft: '600px'}}>
            <FaTimes size={30}/>
            </button>
        </div>
        <div className='cart-products'>
            {productsInCart.length === 0 &&( <span className='empty-text'>Your basket is currenlty empty</span>)}
            {productsInCart.map(item=>(
                <div className='cart-product' key={item.product.id}>
                    <img src={`http://localhost:8080/api/products/get-image/${item.product.imageName}`}
                         alt={item.product.name} />
                         <div className='product-info'>
                            <h3>{item.product.name}</h3>
                            <span className='product-price'>
                                {item.product.price * item.count}$
                            </span>
                         </div>
                         <button
                          className="btn btn-info"
                          onClick={() => onQuantityChange(item, false)}
                        >
                          -
                        </button>
                        <span> {item.count} </span>
                        <button
                          className="btn btn-info"
                          onClick={() => onQuantityChange(item, true)}
                        >
                          +
                        </button>
                         <button className='btn remove-btn' onClick={()=> onProductRemove(item)}>
                            <FaTimes size={20}/>
                         </button>
                </div>
            ))}
            <span className='totalAmount'>Total amount: {totalPrice} $</span>
            {productsInCart.length > 0 &&
             (<Link className='btn checkout-btn' to={'/user/checkout'}  onClick={onClose} style={{fontWeight: 'bold', fontSize: '18px', color: 'red'}}>
                Proceed to checkout
             </Link>)}
        </div>
        </div>
        
    </div>
  )
}

export default ShoppingCart