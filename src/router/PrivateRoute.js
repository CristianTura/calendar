import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component,  isAuthenticated}) => {

    return (
        <Route 
            component={ (props) => (
                isAuthenticated
                ? <Component {...props} />
                : <Redirect to="/login" />
            )}
        />
    )
}

export default PrivateRoute