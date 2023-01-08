import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getImageDetail, sendComment } from '../../services/api';
import useToken from '../../hooks/useToken';
import "./ImageDetail.css"

export default function Home() {

    const [comment, setComment] = useState();
    const [commentList, setCommentList] = useState([]);
    const { imageId } = useParams();
    const { token, isAuthenticated } = useToken();
    const [image, setImage] = useState();

    useEffect(() => {
        if (isAuthenticated()) {
            getImageDetail(imageId, token)
                .then(response => {
                    setImage(response);
                    setCommentList(response.comments);
                });
        }
    }, [token, isAuthenticated, imageId, commentList]);

    const handleSubmit = async e => {
        e.preventDefault();
        sendComment(imageId, {'comment': comment}, token)
            .then(response => {
                setComment("");
                setCommentList([...commentList, response]);
                e.target.reset();
            }).catch(err => {
                alert("Error: " + err.message);
            });
    }

    if (image) {
        return (
            <section id="image-detail">
                <div id="image-detail-card">
                    <div id="image-container">
                        <img id="image" src={image.url} alt={"Image: " + image.id + " - Study - " + image.study_title + " - Patient - " + image.patient_full_name} />
                    </div>
                    <ul id="comments-container">
                        { image.comments.map(comment => {
                            return (
                                <li className="comment" key={comment.id}>
                                    <p><strong>{comment.user_full_name}</strong> <i>({comment.user_email})</i>: "{comment.comment}"</p>
                                    <p className="date">
                                        {
                                            new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }).format(new Date(comment.created_at))
                                        }
                                    </p>
                                </li>
                            )
                        })}
                    </ul>
                    <div id="new-comment">
                        <form id="new-comment-form" onSubmit={handleSubmit}>
                            <textarea onChange={e => setComment(e.target.value)} placeholder="Write a new comment" required />

                            <button className="submit-button" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}