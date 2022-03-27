import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import './Chat.css';
import ChatContainer from '../components/ChatContainer';
import Welcome from '../components/Welcome';
import { io } from 'socket.io-client';

function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        (async function () {
            if (!localStorage.getItem('chat-app-user')) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
                setIsLoaded(true);
            }
        })();
    }, [])

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        (async function () {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    navigate('/setAvatar');
                }
            }
        })();
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
        <div className='main-container'>
            <div className='chat-container-big'>
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {
                    isLoaded && currentChat === undefined ?
                        (
                            <Welcome currentUser={currentUser} />
                        )
                        :
                        (
                            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                        )
                }
            </div>
        </div>
    )
}

export default Chat