import React from 'react'
import "../css/shoppingCart.css"
import {FaTimes} from "react-icons/fa"



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
  return (
    
    <div className='modal' style={{display: visibilty ? "block" : "none"}}>
        <div className='shoppingCart'>
        <div className='header'>
            <h2>Shopping Cart</h2>
            <button className='btn close-btn' onClick={onClose}>
            <FaTimes size={30}/>
            </button>
        </div>
        <div className='cart-products'>
            {productsInCart.length === 0 &&( <span className='empty-text'>Your basket is currenlty empty</span>)}
            {productsInCart.map(item=>(
                <div className='cart-product' key={item.product.id}>
                    <img src={item.product.image}
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
             (<button className='btn checkout-btn'>
                Proceed to checkout
             </button>)}
        </div>
        </div>
        
    </div>
  )
}

export default ShoppingCart