import React, { useState } from 'react';
import { login } from '../../services/api';
import { useNavigate } from "react-router-dom";
import './Login.css';


export default function Login({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        login({'username': email, 'password': password})
            .then(response => {
                setToken(response.token);
                navigate('/');
            }).catch(err => {
                alert('Error while login. Please, check your credentials and try again.');
            });
    }


    return(
        <section id="login">
            <form id="login-form" onSubmit={handleSubmit}>
                <h3>Login</h3>
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" className="form-control" required />
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="form-control" required />        

                <button className="submit-button" type="submit">Login</button>
            </form>
        </section>
    );
}