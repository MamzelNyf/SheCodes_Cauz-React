import React from 'react';

import LoginForm from "../components/LoginForm/LoginForm"

function LoginPage({setUsername}){
    return (
    <div>
        <LoginForm setUsername={setUsername} />
    </div>
    )
}

export default LoginPage 