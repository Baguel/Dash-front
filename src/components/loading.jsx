import {Navigate, Outlet, Route } from 'react-router-dom';

export const Private = () => {
    let token = localStorage.getItem("token");
    return (
        token ? <Outlet/> : <Navigate to="/login" />
    )
}
