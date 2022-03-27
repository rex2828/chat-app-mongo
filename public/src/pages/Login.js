import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
    })

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, []);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
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
        const { password, username } = values;
        if (password === "") {
            toast.error(
                "Email and Password is required.",
                toastOptions
            );
        } else if (username === "") {
            toast.error(
                "Email and Password is required.",
                toastOptions
            );
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
                    <input type='text' placeholder='Username' name='username' onChange={e => { handleChange(e) }} min='3' />
                    <input type='password' placeholder='Password' name='password' autoComplete='true' onChange={e => { handleChange(e) }} />
                    <button type='submit'>Login</button>
                    <span>Don't have an account? <Link to='/register'>Register</Link></span>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login