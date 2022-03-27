import React, { useState, useEffect } from 'react'
import './Contacts.css'
function Contacts({ contacts, changeChat }) {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        (async function () {
            const data = await JSON.parse(
                localStorage.getItem('chat-app-user')
            );
            setCurrentUserName(data.username);
            setCurrentUserImage(data.avatarImage);
        })();
    }, []);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

    return (
        <>
            {
                currentUserName && currentUserImage && (

                    <div className='contact-container'>
                        <div className='brand'>
                            <h3>Chat App</h3>
                        </div>
                        <div className='contacts'>
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div className={`contact ${index === currentSelected ? 'selected-contact' : ''}`} key={index} onClick={() => { changeCurrentChat(index, contact) }}>
                                            <div className="avatar">
                                                <img
                                                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="current-user">
                            <div className="current-avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                                    alt="avatar"
                                />
                            </div>
                            <div className="current-username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default Contacts