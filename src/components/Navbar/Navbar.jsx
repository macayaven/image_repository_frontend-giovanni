import React from 'react';
import { Link } from "react-router-dom";
import useToken from '../../hooks/useToken';
import './Navbar.css';


export default function Navbar() {
    const { isAuthenticated } = useToken();

    return (
        <header>
            <nav className="navbar">
                <h2>Image repository</h2>
                <ul className="navlist">
                    <li>
                        <Link className="navlink" to="/">Home</Link>
                    </li>
                    { isAuthenticated() ?
                        <li>
                            <Link className="navlink" to="/logout">Logout</Link>
                        </li>
                        : <li>
                            <Link className="navlink" to="/register">Register</Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}