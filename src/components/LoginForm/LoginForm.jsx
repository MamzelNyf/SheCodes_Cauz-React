import React, {useState}from 'react'
// import {useHistory} from "react-router-dom"
import PropTypes from 'prop-types';


function LoginForm(props) {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    // const history = useHistory();

    //methods
    const handleChange = (e) => {
        const {id, value} = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]:value,
        }));
    };

    // const postData = async() => {
    //     const response = await fetch(
    //         `${process.env.REACT_APP_API_URL}api-token-auth/`, 
    //         {
    //             method: "post",
    //             headers: {
    //                 "Content-Type":"application/json",
    //         },
    //         body: JSON.stringify(credentials),
    //     });
    //     return response.json()
    // };

    // const handleSubmit = (e, credentials) => {
    //     //prevent the default behavior of the button
    //     e.preventDefault();
    //     if(credentials.username && credentials.password) {
    //         postData().then((response) => {
    //             //console.log("response", response)
    //             window.localStorage.setItem("token", response.token);
    //             window.localStorage.setItem("username", credentials.username)
    //             history.push("/");
    //         });    
    //     }
    // }


    return (
        <form onSubmit={props.handleLogin(credentials)}>
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter username" 
                    onChange={handleChange}
                    value={credentials.username}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter password"
                    onChange={handleChange}
                    value={credentials.password}
                />
            </div>
            <button type="submit" >Login</button>
        </form>
    );
}

export default LoginForm

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired
  };