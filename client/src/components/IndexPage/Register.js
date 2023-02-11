import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setLoggedIn, setUser } from "../../reducers/indexReducer";
import { useRef } from "react";
import authService from "../../services/auth";
import IndexForm from "./IndexForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { validateUsernameAndPassword } from "../../common/utils";

const Register = () => {
    const dispatch = useDispatch();
    const indexPageState = useSelector(state => state.index);
    const timerId = useRef(null);
    const navigate = useNavigate();
    const handleRegister = async () => {
        const { username, password } = validateUsernameAndPassword(dispatch, indexPageState, setErrorMessage);
        await authService
            .register({ username, password })
            .then(response => {
                console.log("response", response);
                if (response.statusText === "ok" && response.loggedIn) {
                    dispatch(setUser(response.user));
                    dispatch(setLoggedIn(true));
                    toast.success("Registration successful");
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
            submitHandler={handleRegister}
            buttonName={"Register"}
            formText={{ p1: "Already a user? ", p2: "Login" }}
            headingText={"Register"}
        />
    );
};
export default Register;
