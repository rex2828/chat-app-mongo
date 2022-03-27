import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
import './ChatInput.css';
function ChatInput({ handleSendMsg }) {

    const [msg, setMsg] = useState("");

    const sendChat = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
        <div className='chat-input-main-container'>
            <form className='chat-input-container' onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder="type your message here" value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </div>
    )
}

export default ChatInput