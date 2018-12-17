import React from 'react';

export const IndexPage = props => {
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