import React, { useState } from 'react';
import { register } from '../../services/api';
import { useNavigate } from "react-router-dom";
import './Register.css';


export default function Register({ setToken }) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        register({'first_name': firstName, 'last_name': lastName, 'email': email, 
                    'username': username, 'password': password, 'password_confirmation': passwordConfirmation})
                    .then(response => {
                        navigate('/')
                    }).catch(err => {
                        alert('Error while registering. Please, try again');
                    })
    }

    return(
        <section id="register">
            <form id="register-form" onSubmit={handleSubmit}>
                <h3>Register</h3>
                <input className="form-control" type="text" onChange={e=> setFirstName(e.target.value)} placeholder="First name" />
                <input className="form-control" type="text" onChange={e=> setLastName(e.target.value)} placeholder="Last name" />
                <input className="form-control" type="email" onChange={e=> setEmail(e.target.value)} placeholder="Email" />
                <input className="form-control" type="text" onChange={e=> setUsername(e.target.value)} placeholder="Username" />
                <input className="form-control" type="password" onChange={e=> setPassword(e.target.value)} placeholder="Password" />
                <input className="form-control" type="password" onChange={e=> setPasswordConfirmation(e.target.value)} placeholder="Password confirmation" />

                <button className="submit-button" type="submit">Register</button>
            </form>
        </section>
    )
}