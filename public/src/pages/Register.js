import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
    const navigate = useNavigate();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if (data.status === false) {
                toast.error(data.message, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate('/')
            }
        }
    }

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same.", toastOptions);
        } else if (username.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        } else if (password.length < 8) {
            toast.error(
                "Password should be equal or greater than 8 characters.",
                toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className='formContainer'>
                <form className='registerForm' onSubmit={(e) => { handleSubmit(e) }}>
                    <div>
                        <h1>Chat App</h1>
                    </div>
                    <input type='text' placeholder='Username' name='username' onChange={e => { handleChange(e) }} />
                    <input type='email' placeholder='Email' name='email' onChange={e => { handleChange(e) }} />
                    <input type='password' placeholder='Password' name='password' autoComplete='true' onChange={e => { handleChange(e) }} />
                    <input type='password' placeholder='Confirm Password' name='confirmPassword' autoComplete='true' onChange={e => { handleChange(e) }} />
                    <button type='submit'>Register</button>
                    <span>Already have an account? <Link to='/login'>Login</Link></span>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register