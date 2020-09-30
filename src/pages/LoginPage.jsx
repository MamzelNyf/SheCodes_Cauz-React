import React from 'react';

import LoginForm from "../components/LoginForm/LoginForm"

function LoginPage({setUsername}){
    return (
    <div>
        <h1>This is login Page</h1>
        <LoginForm setUsername={setUsername} />
    </div>
    )
}

export default LoginPage 