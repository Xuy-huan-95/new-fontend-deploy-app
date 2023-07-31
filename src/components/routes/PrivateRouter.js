import React, { useEffect, useState, useContext } from 'react'
import {
    Route
} from "react-router-dom";
import { Redirect } from "react-router-dom"
import { UserContext } from "../../contexApi/UserContext"

const PrivateRoutes = (props) => {
    const { user } = React.useContext(UserContext);

    if (user && user.isAuthenticated === true) {
        return (

            <Route path={props.path} component={props.component} />
        )
    } else {
        return (
            <Redirect to='/login'></Redirect>

        )
    }

}

export default PrivateRoutes;