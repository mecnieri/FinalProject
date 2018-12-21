import React from 'react';

export const ProfilePage = props => {
    return (
        <div className="profile">
            <h1 className="profile--title">Welcome, { localStorage.getItem('authorized') }</h1>
        </div>
    )
}