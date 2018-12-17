import React from 'react';

export const IndexPage = props => {
    console.log(props);
    return (
        <div className="index">
            <h1 className="index--title">{props.title}</h1>
            <hr />
            <p>
                {props.desc}
            </p>
            <img src={props.url} alt="" />
        </div>
    )
}