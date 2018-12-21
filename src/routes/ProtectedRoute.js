import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ( {component: Component, ...restProps} ) => {
    return (
    <Route {...restProps}
    render={ props => localStorage.getItem('Authorized') ? 
        (<Component {...props}/>) : 
        ( <Redirect to={`/login`} /> ) 
    }
    />
    )
}