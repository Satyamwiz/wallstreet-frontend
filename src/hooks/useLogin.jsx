import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { userService } from "../services/apis";
import {toast} from 'react-toastify';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = (username, password) => {
        const id = toast.loading("Please wait...");
        setLoading(true);
        setError(null);
        userService
            .loginUser({
                password: password,
                email: username,
            })
            .then((res) => {
                localStorage.setItem("user", res.auth_token);
                dispatch({ type: 'LOGIN', payload: res.auth_token });
                setLoading(false);
                toast.update(id, { render: "Logged in successfully !", type: "success", isLoading: false, autoClose:4000 })
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
                toast.update(id, { render: (err.data[Object.keys(err.data)[0]])[0], type: "error", isLoading: false, autoClose:4000 })
            });
    };

    return { login, error, loading };
};
