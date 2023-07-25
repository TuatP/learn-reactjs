import { React } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';

const Nav = ({ setSearch, setCartVisibility, productsInCart }) => {
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
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/contact">
          Contact
        </Link>
      </li>
    </ul>
    <div className="form-inline">
    <input placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
         <button className="btn shopping-cart-btn" onClick={() => setCartVisibility(true)}>
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
