import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setErrorMessage, setLoggedIn, setUser } from "../../reducers/indexPage";
import authService from "../../services/auth";
import IndexForm from "./IndexForm";

const Login = () => {
    const indexPageState = useSelector(state => state.index);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timerId = useRef(null);

    const handleLogin = async () => {
        const username = indexPageState.username.replace(/\s/g, ""); // remove whitespace
        const password = indexPageState.password.replace(/\s/g, ""); // remove whitespace

        if (!username || !password) {
            dispatch(setErrorMessage("Username and Password Required"));
            setTimeout(() => {
                dispatch(setErrorMessage(null));
            }, 5000);
            return;
        }

        await authService
            .login({ username, password })
            .then(response => {
                if (response.statusText === "ok" && response.loggedIn) {
                    dispatch(setUser(response.user));
                    dispatch(setLoggedIn(true));
                    navigate("/home", { replace: true });
                }
            })
            .catch(error => {
                dispatch(setErrorMessage(error.response.data.error));
                clearTimeout(timerId.current);
                timerId.current = setTimeout(() => {
                    dispatch(setErrorMessage(null));
                }, 5000);
            });
    };

    return (
        <IndexForm
            submitHandler={handleLogin}
            buttonName={"Login"}
            formText={{ p1: "Not a user? ", p2: "Register" }}
            headingText={"Login"}
        />
    );
};
export default Login;
