import React from 'react'
import "../css/nav.css"
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div>
        <div className="sidebar" data-color="orange">
        <div className="logo text-center mt-2">
            <a href="!"><img src="https://nerman.com.vn/wp-content/uploads/2021/09/logo-header.svg" alt="" /></a>
        </div>
        <div className="sidebar-wrapper" id="sidebar-wrapper">
            <ul className="nav">
                <li id="nav1">
                    <Link to={"/admin/category/list"}> <i className="now-ui-icons design_app"></i>
                        <p>Categories</p>
                    </Link>
                </li>

                <li id="nav2">
                    <Link to={"/admin/product/list"} > <i className="now-ui-icons education_atom"></i>
                        <p>Products</p>
                    </Link>
                </li>

                <li>
                    <a href="!"> <i className="now-ui-icons location_map-big"></i>
                        <p>Customers</p>
                    </a>
                </li>

                <li id="nav4">
                    <Link to={"/admin/order"} > <i className="now-ui-icons education_atom"></i>
                        <p>Order</p>
                    </Link>
                </li>

                <li id="nav4">
                    <Link to={"/admin/confirm-order"} > <i className="now-ui-icons education_atom"></i>
                        <p>Confirm Order</p>
                    </Link>
                </li>

                <li id="nav4">
                    <Link to={"/admin/report/top-user"} > <i className="now-ui-icons education_atom"></i>
                        <p>Statistical</p>
                    </Link>
                </li>

  
                <li id="nav4">
                    <Link to={"/user/products"} > <i className="now-ui-icons education_atom"></i>
                        <p>Home</p>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
    </div>
  )
}
