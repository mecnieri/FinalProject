import React from 'react';

export const ContactPage = props => {
    return (
        <div className="index">
            <h1 className="index--title">{props.title}</h1>
            <hr />
            <p>
                {props.desc}
            </p>
        </div>
    )
}