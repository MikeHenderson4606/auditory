
import React, { useState, useEffect } from 'react';
import * as client from '../Client';
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from "../Login/loginReducer";
import { setUserData } from "../Login/userDataReducer";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");

    const handleModalShow = () => {
        setShowModal(!showModal);
    }

    return(
        <div className="feed-offset">
            <h1 className="d-flex justify-content-center">Register for Auditory!</h1>
            <div className="d-flex justify-content-center">
                <div className="bg-light border p-2 rounded" >
                    <input className="form-control" placeholder="Username" onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                    <input className="form-control mt-2" placeholder="Password" type="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <input className="form-control mt-2" placeholder="Email" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <input className="form-control mt-2" placeholder="Phone Number" onChange={(e) => {
                        setNumber(e.target.value);
                    }} />
                    <button className="btn btn-success mt-2" onClick={async () => {
                        if (username.length > 3 && password.length > 3) {
                            const response = await client.registerUser({username: username, password:password, email:email, number:number});
                            if (response.code !== 400) {
                                dispatch(setUserData({
                                    username: username,
                                    userId: response.userId
                                }));
                                dispatch(setLoggedIn(true));
                                navigate('/profile');
                            } else {
                                setError(response.message);
                                handleModalShow();
                            }
                        } else {
                            setError("Username and password must be longer than 3 characters");
                            handleModalShow();
                        }
                    }}>Register</button>
                    <p className='mt-4'>
                        Already have an account? <br /> 
                        Login here: 
                        <Link to="/login">
                            Login
                        </Link>
                    </p>
                    
                </div>
            </div>

            <Modal show={showModal} onHide={handleModalShow}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    There was an error registering you: {error}
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger' onClick={() => {
                        handleModalShow();
                    }}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Register;