import React, { useState } from 'react'
import axios from 'axios';
import "../css/login.css"


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/api/customers/login",{
                    username: username,
                    password: password
                }
            );
            console.log("Success: ", response.data);

            localStorage.setItem("key", response.data);
        } catch (error) {
            console.log("Login fail: ", error)
        }
    }


  return (
<div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <form  method="post" class="box">
                                <h1>Login</h1>
                                <p class="text-muted">Please enter your login and password!</p>
                                <i class=" text-danger" ></i>
                                <input type="text" name="username" value={username} onChange={handleUsernameChange} placeholder="Username" />
                                <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                                <a class="forgot text-muted" >Register</a>

                                <input type="submit" name="" onClick={handleLogin} value="Login" href="#" />
                                <div class="col-md-12">
                                    <ul class="social-network social-circle">
                                        <li>
                                            <a href="/oauth2/authorization/facebook" class="icoFacebook" title="Facebook"><i class="fa fa-facebook-f"></i></a>
                                        </li>
                                        <li>
                                            <a href="#" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a href="/oauth2/authorization/google" class="icoGoogle" title="Google +"><i class="fa fa-google-plus"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>  )
}
