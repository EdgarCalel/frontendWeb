import React, { useState } from "react";
import "./index.css"
import axios from 'axios';
import LogoPrincipal from "../assets/img/logoPrincipal.jpg"
const {
    REACT_APP_SERVER,
} = process.env;


function Login() {
    const [body, setBody] = useState({
        username: '',
        password: ''
    });
    function handleChange(e) {
        setBody({
            ...body,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async () => {
        await axios.post(`${REACT_APP_SERVER}/usuarios/auth`, body)
            .then(({ data }) => {
                if (data.msg.length) {
                    localStorage.setItem('auth', '"yes"')
                } else {
                    alert("no se ha podido iniciar session")
                }
                 window.location.reload()
            }).catch(({ response }) => {
                console.log(response.data.msg.data);
            })
    }
    return (
        <>
            <div className="container h-100">
                <div className="login_name_wrapper">
                    <div className="d-flex justify-content-center">Login</div>
                </div>
                <div className="d-flex justify-content-center h-50" >
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="login_logo_container"> <img src={LogoPrincipal} className="login_logo" alt="Logo" /> </div>
                        </div>
                        <div className="d-flex justify-content-center form_container">
                            <form style={{ width: "320px" }} onClick={(e) => handleSubmit(e)}>
                                <div id="msgcont" className="d-flex justify-content-center" style={{ display: "none!important" }}>
                                    <div id="msg" className="alert alert-danger py-1 px-2" role="alert"></div>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append"> <span className="input-group-text"><i className="fas fa-user"></i></span> </div>
                                    <input type="text" name="username" value={body.username} className="form-control input_user" placeholder="codigo" required onChange={(e) => handleChange(e)} />
                                </div>
                                <div className="input-group mb-4">
                                    <div className="input-group-append"> <span className="input-group-text"><i className="fas fa-key"></i></span> </div>
                                    <input id="pass" type="password" name="password" value={body.password} className="form-control input_pass" placeholder="*********" required onChange={(e) => handleChange(e)} />
                                </div>

                                <div className="d-flex justify-content-center mt-3 login_container">
                                    <button type="button" name="button" className="btn login_btn">Login</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
