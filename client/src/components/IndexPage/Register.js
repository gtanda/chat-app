import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage } from "../../reducers/indexPage";
import { useRef } from "react";
import authService from "../../services/auth";
import IndexForm from "./IndexForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const indexPageState = useSelector(state => state.index);
    const timerId = useRef(null);
    const navigate = useNavigate();
    const handleRegister = async () => {
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
            .register({ username, password })
            .then(response => {
                if (response.statusText === "ok") {
                    toast.success("Registration successful");
                    navigate("/login", { replace: true });
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
            submitHandler={handleRegister}
            buttonName={"Register"}
            formText={{ p1: "Already a user? ", p2: "Login" }}
            headingText={"Register"}
        />
    );
};
export default Register;
