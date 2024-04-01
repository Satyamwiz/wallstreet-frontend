import { React, useState } from "react";
import { useLogin } from "../hooks/useLogin.jsx";

const Login = () => {
    const [username, setName] = useState("");

    const [password, setPass] = useState("");

    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className="login-page px-4">
            <form className="login-form shadow-lg">
                <h4>User Login</h4>
                <input
                    className="my-4"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                    value={username}
                />
                <input
                    className="my-4"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)}
                    value={password}
                />
                <input
                    className="my-1"
                    type="submit"
                    value="Log In"
                    onClick={(e) => handleSubmit(e)}
                />
                {/* add the loader and error handling */}
            </form>
        </div>
    );
};

export default Login;
