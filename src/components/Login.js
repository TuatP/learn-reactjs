import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../css/login.css"
import {FaFacebook, FaGoogle, FaTwitter} from "react-icons/fa"


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/api/customers/login", {
                username: username,
                password: password
            }
            );
            console.log("Success: ", response.data);

            localStorage.setItem("key", response.data);
            navigate('/user/products'); 
        } catch (error) {
            console.log("Login fail: ", error)
        }
    }


    return (
        <div style={{ width: "100%", height: "700px", background: "linear-gradient(to right, #b92b27, #1565c0)" }}>
            <div class="row">
                <div className='loginForm'>
                    <div class="col-md-6">
                        <form method="post" class="box">
                            <h1>Login</h1>
                            <p class="text-muted">Please enter your login and password!</p>
                            <i class=" text-danger" ></i>
                            <input type="text" name="username" value={username} onChange={handleUsernameChange} placeholder="Username" />
                            <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                            <Link to={'/user/register'} class="forgot text-muted" >Register</Link>

                            <input type="submit" name="" onClick={handleLogin} value="Login" href="#" />
                            <div class="col-md-12">
                                <ul class="social-network social-circle">
                                    <li>
                                        <a href="/oauth2/authorization/facebook" class="icoFacebook" title="Facebook">
                                            <FaFacebook size={25} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="icoTwitter" title="Twitter">
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
