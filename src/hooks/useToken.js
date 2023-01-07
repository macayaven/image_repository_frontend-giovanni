import { useState } from 'react';

export default function useToken() {
    
    const getToken = () => {
        const localStorageToken = localStorage.getItem('token');
        return JSON.parse(localStorageToken);
    }

    const [token, setToken] = useState(getToken());

    const isAuthenticated = () => {
        return token !== null
    }

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    }

    return {
        setToken: saveToken,
        token, 
        isAuthenticated
    }
}