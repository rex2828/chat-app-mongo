import React, { useState, useEffect, useRef } from 'react';
import './ChatContainer.css';
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';

function ChatContainer({ currentChat, currentUser, socket }) {

    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        (async function () {
            if (currentUser && currentChat) {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                });
                setMessages(response.data);
            }
        })();
    }, [currentChat]);

    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(localStorage.getItem('chat-app-user'))._id;
            }
        };
        getCurrentChat();
    }, [currentChat]);


    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-recieve', (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            {
                currentChat &&
                (
                    <div className='chat-container'>
                        <div className="chat-container-header">
                            <div className="chat-container-user-details">
                                <div className="chat-container-avatar">
                                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                                </div>
                                <div className="chat-container-username">
                                    <h3>{currentChat.username}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        <div className='chat-container-chat-messages'>
                            {
                                messages.map((message, index) => {
                                    return (
                                        <div ref={scrollRef} key={uuidv4()} >
                                            <div className={`chat-container-chat-message ${message.fromSelf ? "sended" : "recieved"}`}>
                                                <div className="chat-container-content">
                                                    <p>{message.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </div>
                )
            }
        </>
    )
}

export default ChatContainer;
