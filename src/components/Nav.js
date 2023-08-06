import { React, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import "../css/navU.css"
import { ProductContext } from '../App';

const Nav = () => {
  const {setSearch, setcartsVisibilty, productsInCart} = useContext(ProductContext);


    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
  <Link className="navbar-brand" to={"/"}>
    Phone Shop
  </Link>
  <button
    className="navbar-toggler"
    type="button" 
    data-toggle="collapse"
    data-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/user/products">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/user/about">
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/user/contact">
          Contact
        </Link>
      </li>
    </ul>
    <div className="form-inline">
    <input placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
         <button className="btn shopping-cart-btn" onClick={() => setcartsVisibilty(true)}>
           <FaShoppingCart size={30} color='white'/>
           {productsInCart.length > 0 &&
             <span className='product-count'>
               {productsInCart.length}
             </span>}
         </button>
    </div>
  </div>
</nav>


      
    );
  };
  
  export default Nav
