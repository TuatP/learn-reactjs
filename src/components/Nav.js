import { React, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import "../css/navU.css"
import { ProductContext } from '../App';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const Nav = () => {
  const { setSearch, setcartsVisibilty, productsInCart } = useContext(ProductContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa dựa vào Local Storage
    const userToken = localStorage.getItem("key");
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Xử lý đăng xuất và xóa thông tin đăng nhập từ Local Storage
    localStorage.removeItem("key");
    setIsLoggedIn(false);
    window.location.reload(true);
  };




  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link className="navbar-brand" to={"/user/products"}>
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
            <FaShoppingCart size={30} color='white' />
            {productsInCart.length > 0 &&
              <span className='product-count'>
                {productsInCart.length}
              </span>}
          </button>
        </div>
        {isLoggedIn ? (
          <DropdownButton id="dropdown-basic-button" title={localStorage.getItem("key")}>
             <Dropdown.Item href="#/action-2">
              <Link className="nav-link" to="/user/profile">
                <span>My Account</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <Link className="nav-link" to="/user/purchase">
                <span>My Purchase</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <Link className="nav-link" to="/user/purchase/status">
                <span>Wait Confirmation</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <button className="nav-link" onClick={handleLogout}><span>Logout</span></button>
            </Dropdown.Item>
          </DropdownButton>) : (
          <>
            <Link className="nav-link" to="/user/login" style={{ color: 'white', margin: '5px' }}>Login|</Link>
            <Link className="nav-link" to="/user/register" style={{ color: 'white' }}>Register</Link>
          </>

        )}




      </div>
    </nav>



  );
};

export default Nav
