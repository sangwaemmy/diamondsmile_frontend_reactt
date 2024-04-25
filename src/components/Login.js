import React, { useState } from 'react'

// import Title from './forms/Title'
import axios from "axios"
import OtherStyles from './Styles/OtherStyles';

import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Commons from '../services/Commons';
import SessionTime from '../services/SessionTime';
import Buttons from './Global/Buttons';


function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginStatus, setLoginStatus] = useState("default")   //default, failed, success
    const [showLoader, setShowLoader] = useState(false)
    const [backedNotConnected, setBackedNotConnected] = useState(false)
    const navigate = useNavigate();



    const onSubmitHandler = (e) => {
        e.preventDefault()
        setShowLoader(true)

        //var url = Commons.getLogin(username,password);

        Commons.getLogin(username, password).then((res) => {
            console.log('After Login ..................')
            console.log(res.data)

            if (res.data == null || res.data == '') {
                console.log('Login Failed')
                setLoginStatus('failed')
                document.getElementById("Form").reset();
            } else {
                const d = new Date()
                const timeStr =d.toLocaleTimeString()
                const min=SessionTime.getMinutes(timeStr)
                
                setLoginStatus('success')
                localStorage.setItem('userId', res.data.id)
                localStorage.setItem('LoginTime', timeStr)
                localStorage.setItem("min", SessionTime.getMinutes(new Date().toLocaleTimeString()))
                localStorage.setItem('ExpireTime', new Date().toLocaleTimeString() + 5)
                console.log('userId: ' + localStorage.getItem('userId'))
                window.location.href = "/client"
            }
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                setLoginStatus('failed')
                setBackedNotConnected(true)
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);
            }
            // console.log(error.config);

        });
    };
    const removeAlert = () => {
        setLoginStatus('default')
    }
    return (
        <div className='container-fluid border border-dark loginBg ' style={{ height: window.innerHeight }}>

            <div className='row d-flex justify-content-center d-flex  ' style={{ marginTop: "70px" }}>
                <div className='col-6'>
                    {(loginStatus == 'failed') &&
                        <div class="alert alert-danger text-center" role="alert">
                            Login Failed {backedNotConnected && " - The Logic not conntected!"}
                        </div>}
                    <form onSubmit={(e) => onSubmitHandler(e)} id="Form">
                        <div className="form-row   formPane p-3 mt-3" style={{ border: "2px solid #b016be" }}>
                            <h2 style={{ fontWeight: "bolder" }}>  Login </h2>
                            <div class="form-group row m-3">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Username</label>
                                <div class="col-sm-10">
                                    <input type="text" onClick={removeAlert} name='username' required autoComplete='false' style={OtherStyles.txt()} className="form-control" onChange={(event) => setUsername(event.target.value)} id="username" />
                                </div>
                            </div>
                            <div class="form-group row m-3">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-10">
                                    <input type="password" name='password' required autoComplete='false' style={OtherStyles.txt()} className="form-control" onChange={(event) => setPassword(event.target.value)} id="password" />
                                </div>
                            </div>
                            <div className='container px-5'>
                                <Buttons caption="Login" id="liveToastBtn" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
