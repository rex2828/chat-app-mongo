import React from 'react'

function Welcome({ currentUser }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1>
                Welcome, {currentUser.username}
            </h1>
        </div>
    )
}

export default Welcome;