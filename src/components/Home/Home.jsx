import React, { useState, useEffect } from 'react';
import { getImages, getStudies } from '../../services/api';
import useToken from '../../hooks/useToken';
import {FaFolder, FaHospitalUser, FaPlusCircle } from 'react-icons/fa';
import "./Home.css"
import { useNavigate } from 'react-router-dom';
import NewImageModal from '../NewImageModal/NewImageModal';


export default function Home() {

    const { token, isAuthenticated } = useToken();
    const [images, setImages] = useState([]);
    const [studies, setStudies] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            getImages(token)
                .then(response => {
                    setImages(response);
                });

            getStudies(token)
                .then(response => {
                    setStudies(response);
                }).catch(err => {
                    alert("Error: " + err.message);
                });
        }
    }, [token]);

    return (
        <section id="home">
            <ul className="image-list">
                <li className='image-list-detail image-list-add' onClick={() => setOpen(true)}>
                    <FaPlusCircle className="add-icon" />
                    <p>Add image</p>
                </li>
                <NewImageModal open={open} setOpen={setOpen} studies={studies} images={images} setImages={setImages} />
                { images ? images.map(image => {
                    return (
                    <li className="image-list-detail image-list-data" key={image.id} onClick={() => navigate('/images/' + image.id)}>
                        <h4>ID: {image.id} - {image.name.toUpperCase()}</h4>
                        <p><FaFolder /> {image.study_title}</p>
                        <p><FaHospitalUser /> {image.patient_full_name}</p>
                    </li>)
                }): <></>}
            </ul>
        </section>
      );
}