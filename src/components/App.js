import React, { useState, useEffect } from 'react';
import './style/main.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './shared/Header';
import Finance from './finance/Finance';
import Register from './auth/Register';
import Login from './auth/Login';
import AuthContext from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import Homepage from './shared/Homepage';
import Seo from './seo/Seo';

function App() {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setToken(token);
        }
    }, [])

    return (
        <>
        <AuthContext.Provider value ={ { token, setToken } }>
            <BrowserRouter>
                <Header />
                <Route exact path="/">
                    <Homepage />
                </Route>    
                <PrivateRoute exact path="/finance">
                    <Finance />
                </PrivateRoute>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <PrivateRoute exact path="/seo">
                    <Seo />
                </PrivateRoute>
            </BrowserRouter>
        </AuthContext.Provider>
        </>
    )
}

export default App;