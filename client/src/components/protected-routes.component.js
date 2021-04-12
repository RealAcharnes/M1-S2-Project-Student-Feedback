import React from 'react'
import { Redirect } from 'react-router-dom'
import AuthService from "../services/auth.service";

const ProtectedRoute =({ component: Component, role, ...rest })=> {
        const currentUser = AuthService.getCurrentUser()
        let isAuthenticated = '';
        let isAuthorized = false;

        if(currentUser){
            isAuthenticated = currentUser.token;

            role.map(roles => {
                if(currentUser.message.roles.includes(roles)){
                    isAuthorized = true;
                } 
            });
        }

        return (isAuthenticated && (isAuthorized))? (
            <Component />
        ) : (
            <div>
            <Redirect to={{ pathname: '/home' }} />
            </div>
        );
}

export default ProtectedRoute;