import React, { useEffect, useState } from "react";
import axios from "axios";
import loader from "../assets/loader.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from 'buffer';
import './SetAvatar.css';
const SetAvatar = () => {
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();


    useEffect(() => {
        (async function () {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        })();
    }, []);




    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error('Please select an avatar', toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    'chat-app-user',
                    JSON.stringify(user)
                );
                navigate("/");
            } else {
                toast.error("Error setting avatar. Please try again.", toastOptions);
            }
        }
    }

    return (
        <>
            {
                isLoading ?
                    <div className="setAvatarContainer">
                        <img src={loader} alt="loader" className="loader"></img>
                    </div> :
                    (
                        <div className="setAvatarContainer">
                            <div className="title-container">
                                <h1>
                                    Pick an avatar as your profile picture.
                                </h1>
                            </div>
                            <div className="avatars">
                                {
                                    avatars.map((avatar, index) => {
                                        return (
                                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                                <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' onClick={() => setSelectedAvatar(index)}></img>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
                        </div>
                    )
            }
            <ToastContainer />
        </>
    )
}

export default SetAvatar