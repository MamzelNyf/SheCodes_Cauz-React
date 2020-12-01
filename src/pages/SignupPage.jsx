import React from 'react';

import SignupForm from "../components/SignupForm/SignupForm"

function SignupPage( {setUsername} ){
    return (
    <div>
        <SignupForm  setUsername={setUsername} />
    </div>
    )
}

export default SignupPage 