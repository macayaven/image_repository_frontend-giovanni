import React, { useState, useEffect } from 'react';
import { addImage } from '../../services/api';
import useToken from '../../hooks/useToken';
import ReactModal from 'react-modal';
import "./NewImageModal.css"
import { FaImages } from 'react-icons/fa';

export default function NewImageModal({open, setOpen, studies, images, setImages}) {

    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [studyId, setStudyId] = useState();
    const { token } = useToken();

    const handleSubmit = async e => {
        e.preventDefault();

        if (extraValidation()) {
            addImage({'name': name, 'study': studyId, 'file': image}, token)
                .then(response => {
                    setImages([...images, response]);
                    handleModalClose();
                }).catch(err => {
                    alert('Error uploading image: ' + err.message);
                });
        } else {
            alert('Please, select an image');
        }
    }

    const handleModalClose = () => { 
        setName('');
        setImage('');
        setStudyId('');
        setOpen(false);
    }

    const  extraValidation = () => {

        if (studyId === "") {
            alert('Please, select a study');
            return false;
        }

        if (image === null || image === undefined) {
            alert('Please, select an image');
            return false;
        }

        return true;

    }

    return (
        <ReactModal
            className="new-image-modal"
            isOpen={open}
            contentLabel="New Image Modal"
            onRequestClose={handleModalClose}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
        >
            <form id="new-image-form" onSubmit={handleSubmit}>
                <h3>Add Image</h3>
                <input type="text" className="form-control" onChange={e => setName(e.target.value)} placeholder="Image name" required />
                <select className="form-control" onChange={e => setStudyId(e.target.value)}>
                    <option value="">Select a study</option>
                    { 
                        studies ? studies.map(study => {
                            return (
                                <option value={study.id}>{study.title}</option>
                            )
                        }) : <></>
                    }
                </select>
                <div className="custom-file-uploader">
                    <label htmlFor="file-upload" className="file-upload-button">
                        Select Image
                        <input id="file-upload" type="file" onChange={e => setImage(e.target.files[0])} accept="image/png, image/jpeg" />
                    </label>
                    { image ? 
                        <p>{image.name}</p>
                        : <></>
                    }
                </div>
                <button className="submit-button" type="submit">Add image</button>
            </form>
            <button onClick={() => setOpen(false)}>Close Modal</button>
        </ReactModal>
    )
    
}