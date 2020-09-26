import React, {useState}from 'react'
import {useHistory} from "react-router-dom"
import {useAppContext} from '../../libs/contextLib';

function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const history = useHistory();
    //Context API is the consumer. use  app context here and use userHasAuthenticated function.
    const { userHasAuthenticated } = useAppContext();

    //methods
    const handleChange = (e) => {
        const {id, value} = e.target;
        userHasAuthenticated(true);
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]:value,
        }));
    };

    const postData = async() => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api-token-auth/`, 
            {
                method: "post",
                headers: {
                    "Content-Type":"application/json",
            },
            body: JSON.stringify(credentials),
        });
        return response.json()
    };
    const handleSubmit = (e) => {
        //prevent the default behavior of the button
        e.preventDefault();
        if(credentials.username && credentials.password) {
            postData().then((response) => {
                //console.log("response", response)
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("username", credentials.username)
                history.push("/");
            });    
        }
    }
    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter username" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter password"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
    );
}

export default LoginForm