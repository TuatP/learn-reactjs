import React from 'react'
import "../css/nav.css"
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div>
        <div class="sidebar" data-color="orange">
        <div class="logo text-center mt-2">
            <a href="!"><img src="https://nerman.com.vn/wp-content/uploads/2021/09/logo-header.svg" alt="" /></a>
        </div>
        <div class="sidebar-wrapper" id="sidebar-wrapper">
            <ul class="nav">
                <li id="nav1">
                    <Link to={"/admin/category/list"}> <i class="now-ui-icons design_app"></i>
                        <p>Categories</p>
                    </Link>
                </li>

                <li id="nav2">
                    <Link to={"/admin/product/list"} > <i class="now-ui-icons education_atom"></i>
                        <p>Products</p>
                    </Link>
                </li>

                <li>
                    <a href="!"> <i class="now-ui-icons location_map-big"></i>
                        <p>Customers</p>
                    </a>
                </li>

                <li>
                    <a href="!"> <i class="now-ui-icons location_map-big"></i>
                        <p>Orders</p>
                    </a>
                </li>

                    <li>
                        <a href="!"> <i class="now-ui-icons location_map-big"></i>
                            <p>Account</p>
                        </a>
                    </li>
            </ul>
        </div>
    </div>
    </div>
  )
}
