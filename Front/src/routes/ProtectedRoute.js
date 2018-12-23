import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ( {component: Component, ...restProps} ) => {
    return (
    <Route {...restProps}
<<<<<<< HEAD
    render={ props => localStorage.getItem('authorized') ? 
=======
    render={ props => localStorage.getItem('Authorized') ? 
>>>>>>> origin/master
        (<Component {...props}/>) : 
        ( <Redirect to={`/login`} /> ) 
    }
    />
    )
}