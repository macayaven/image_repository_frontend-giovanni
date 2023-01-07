import React, { useState, useEffect } from 'react';
import { getImages } from '../../services/api';
import useToken from '../../hooks/useToken';
import "./Home.css"

export default function Home() {

    const { token, isAuthenticated } = useToken();
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (isAuthenticated()) {
            getImages(token)
                .then(response => {
                    setImages(response);
                });
        }
    }, [token]);

    return (
        <div id="home">
            <ul className="image-list">
                { images ? images.map(image => {
                    return (
                    <li>
                        <p>ID: {image.id}</p>
                        <p>Name: {image.name}</p>
                    </li>)
                }): <></>}
            </ul>
        </div>
      );
}