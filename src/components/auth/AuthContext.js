import React from 'react';

const AuthContext = React.createContext({
    token: null,
    setToken: () => {}
});

export default AuthContext;