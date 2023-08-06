import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {FaFacebook, FaGoogle, FaTwitter} from "react-icons/fa"

import axios from 'axios';
import "../css/register.css"

export default function Register() {

    const [customer, setCustomer] = useState({
        username: "",
        email: "",
        name: "",
        password: "",
        phone: ""
    })


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCustomer({ ...customer, [name]: value });
    };

    const navigate = useNavigate();

    const handleAddSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("username", customer.username);
            formData.append("email", customer.email);
            formData.append("name", customer.name);
            formData.append("password", customer.password);
            formData.append("phone", customer.phone);

            const reponse = await axios.post(
                "http://localhost:8080/api/customers",
                formData
            );
            navigate('/user/login'); 
            console.log("Register success: " + reponse.data);

        } catch (error) {
            console.log("Thêm thất bại", error);
        }
    }

    return (
        <div style={{ background: 'linear-gradient(rgb(134 141 211), rgb(35 39 43))', minHeight: '100vh', padding: '20px', paddingBottom: '50px' }}>
            <div className="wrapperr">
                <form action="#" encType="multipart/form-data">
                    <div className="h5 font-weight-bold text-center mb-3">Registration</div>
                    <div className="form-group d-flex align-items-center">
                        <div className="icon">
                            <span className="far fa-user" />
                        </div>
                        <input
                            autoComplete="off"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            onChange={handleChange}
                            value={customer.username}
                            name='username'
                        />
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <div className="icon">
                            <span className="fas fa-key" />
                        </div>
                        <input
                            autoComplete="off"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                            value={customer.password}
                            name='password'
                        />
                        <div className="icon btn">
                            <span className="fas fa-eye-slash" />
                        </div>
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <div className="icon">
                            <span className="far fa-envelope" />
                        </div>
                        <input
                            autoComplete="off"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={handleChange}
                            value={customer.email}
                            name='email'
                        />
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <div className="icon">
                            <span className="fas fa-phone" />
                        </div>
                        <input
                            autoComplete="off"
                            type="tel"
                            className="form-control"
                            placeholder="Phone"
                            onChange={handleChange}
                            value={customer.phone}
                            name='phone'
                        />
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <div className="icon">
                            <span className="fas fa-map-marker-alt" />
                        </div>
                        <input
                            autoComplete="off"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            onChange={handleChange}
                            value={customer.name}
                            name='name'
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label className="option">
                            Remember me
                            <input type="checkbox" defaultChecked="" />
                            <span className="checkmark" />
                        </label>
                    </div>
                    <button className="btn btn-primary mb-3" onClick={handleAddSubmit}>Signup</button>
                    <div className="connect border-bottom mt-4 mb-4" />
                    <ul className="p-0 social-links">
                        <li>
                            <a href="#">
                                <FaFacebook size={25} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <FaGoogle size={25} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <FaTwitter size={25} />
                            </a>
                        </li>
                    </ul>
                </form>
            </div>


        </div>
    )
}
