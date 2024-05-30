/* eslint-disable react/prop-types */
import React from 'react'
// import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router'

const CookerRouters = (role) => {
    let isAuthenticated = JSON.parse(localStorage.getItem("user"));
    return isAuthenticated?.role === 'Cooker' ? <Outlet /> : <Navigate to="/error" />;
}

export default CookerRouters