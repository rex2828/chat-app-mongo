import React from 'react'
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import './Logout.css';
function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        // const id = await JSON.parse(localStorage.getItem('chat-app-user'))._id;
        // const data = await axios.get(`${logoutRoute}/${id}`);
        localStorage.clear();
        navigate("/login");
    };

    return (
        <button className='logout-button' onClick={handleClick}><BiPowerOff /></button>
    )
}

export default Logout