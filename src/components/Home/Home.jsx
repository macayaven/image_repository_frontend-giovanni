import React, { useState, useEffect } from 'react';
import { getImages } from '../../services/api';
import useToken from '../../hooks/useToken';
import {FaFolder, FaHospitalUser} from 'react-icons/fa';
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
                    <li className="image-list-detail" key={image.id}>
                        <h4>ID: {image.id} - {image.name.toUpperCase()}</h4>
                        <p><FaFolder /> {image.study_title}</p>
                        <p><FaHospitalUser /> {image.patient_full_name}</p>
                    </li>)
                }): <></>}
            </ul>
        </div>
      );
}