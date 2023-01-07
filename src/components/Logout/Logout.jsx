import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export default function Logout({setToken}) {

    const navigate = useNavigate();
    
    useEffect(() => {
        setToken(null);
        navigate('/');
    });

    return <></>
}