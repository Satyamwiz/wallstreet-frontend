import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { userService } from "../services/apis";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = (username, password) => {
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
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
            });
    };

    return { login, error, loading };
};
