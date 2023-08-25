import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../css/login.css"
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa"
import { useFormik } from 'formik';
import * as Yup from "yup";



export default function Login() {

    const navigate = useNavigate();



    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Please input username").min(4, "Must be 4 charaters or more"),
            password: Yup.string().required("Please input password").min(6, "Must be 6 charaters or more")
        }),
        onSubmit: async () => {
            const response = await axios.post(
                "http://localhost:8080/api/customers/login", formik.values
                // {
                //     username: formik.values.username,
                //     password: formik.values.password
                // }
            );
            console.log("Success: ", response.data);

            localStorage.setItem("key", response.data);
            navigate('/user/products');
            window.location.reload(true);
        }
    })
    console.log(formik.values);


    return (
        <div style={{ width: "100%", height: "700px", background: "linear-gradient(to right, #b92b27, #1565c0)" }}>
            <div class="row">
                <div className='loginForm'>
                    <div class="col-md-6">
                        <form method="post" class="box" onSubmit={formik.handleSubmit}>
                            <h1>Login</h1>
                            <p class="text-muted">Please enter your login and password!</p>
                            <i class=" text-danger" ></i>
                            <input type="text" name="username"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                placeholder="Username" />
                            {
                                formik.errors.username && (
                                    <p className='errorMsg'>{formik.errors.username} </p>
                                )
                            }
                            <input type="password" name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                placeholder="Password" />
                            {
                                formik.errors.password && (
                                    <p className='errorMsg'>{formik.errors.password} </p>
                                )
                            }
                            <Link to={'/user/register'} class="forgot text-muted" >Register</Link>

                            <input type="submit" name="" value="Login" href="#" />
                            <div class="col-md-12">
                                <ul class="social-network social-circle">
                                    <li>
                                        <a href="/oauth2/authorization/facebook" class="icoFacebook" title="Facebook">
                                            <FaFacebook size={25} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="!" class="icoTwitter" title="Twitter">
                                            <FaTwitter size={25} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/oauth2/authorization/google" class="icoGoogle" title="Google +">
                                            <FaGoogle size={25} />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
}
