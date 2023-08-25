import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {FaFacebook, FaGoogle, FaTwitter} from "react-icons/fa"
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2"

import axios from 'axios';
import "../css/register.css"

export default function Register() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            name: "",
            password: "",
            phone: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Please input username").min(4, "Must be 4 charaters or more"),
            email: Yup.string().required("Please input email").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"),
            name: Yup.string().required("Please input name").min(6, "Must be 4 charaters or more"),
            password: Yup.string().required("Please input password").min(6, "Must be 4 charaters or more"),
            phone: Yup.string().required("Please input phone number").matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Please enter a valid phone number")
        }),
        onSubmit: async () => {
            console.log(formik.values);
             await axios.post("http://localhost:8080/api/customers", formik.values);
             Swal.fire(
                'Register is success',
                'Please login',
                'success'
              )
             navigate('/user/login')
        }
    });

    

   

    return (
        <div style={{ background: 'linear-gradient(rgb(134 141 211), rgb(35 39 43))', minHeight: '100vh', padding: '20px', paddingBottom: '50px' }}>
            <div className="wrapperr">
                <form action="#"  onSubmit={formik.handleSubmit}>
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
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            name='username'
                            id='username'
                        />
                        
                    
                    </div>
                    {
                        formik.errors.username && (
                            <p className='errorMsg'>{formik.errors.username} </p>
                        )
                    }
                    <div className="form-group d-flex align-items-center">
                        <div className="icon">
                            <span className="fas fa-key" /> 
                        </div>
                        <input
                            autoComplete="off"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            name='password'
                            id='password'
                        />
                        <div className="icon btn">
                            <span className="fas fa-eye-slash" />
                        </div>
                    </div>
                    {
                        formik.errors.password && (
                            <p className='errorMsg'>{formik.errors.password} </p>
                        )
                    }

                    <div className="form-group d-flex align-items-center">
                        <div className="icon">
                            <span className="fas fa-map-marker-alt" />
                        </div>
                        <input
                            autoComplete="off"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            name='name'
                            id='name'
                        />
                    </div>
                    {
                        formik.errors.name && (
                            <p className='errorMsg'>{formik.errors.name} </p>
                        )
                    }
                    <div className="form-group d-flex align-items-center">
                        <div className="icon">
                            <span className="far fa-envelope" />
                        </div>
                        <input
                            autoComplete="off"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            name='email'
                            id='email'
                        />
                    </div>
                    {
                        formik.errors.email && (
                            <p className='errorMsg'>{formik.errors.email} </p>
                        )
                    }
                    <div className="form-group d-flex align-items-center">
                        <div className="icon">
                            <span className="fas fa-phone" />
                        </div>
                        <input
                            autoComplete="off"
                            type="tel"
                            className="form-control"
                            placeholder="Phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            name='phone'
                            id='phone'
                        />
                    </div>
                    {
                        formik.errors.phone && (
                            <p className='errorMsg'>{formik.errors.phone} </p>
                        )
                    }
                    

                    <button className="btn btn-primary mb-3" type='submit'>Signup</button>

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
