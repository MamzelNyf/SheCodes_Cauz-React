import React from 'react';

import SignupForm from "../components/SignupForm/SignupForm"

function SignupPage( {setUsername} ){
    return (
    <div>
        <h1>This is Signup Page</h1>
        <SignupForm  setUsername={setUsername} />
    </div>
    )
}

export default SignupPage 