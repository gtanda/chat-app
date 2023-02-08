import {useDispatch, useSelector} from "react-redux";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {setErrorMessage, setIsError} from "../../reducers/indexPage";
import authService from "../../services/auth";
import IndexForm from "./IndexForm";

const Login = () => {
    const indexPageState = useSelector((state) => state.index);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timerId = useRef(null);

    const handleLogin = async () => {
        const username = indexPageState.username.replace(/\s/g, '') // remove whitespace
        const password = indexPageState.password.replace(/\s/g, '') // remove whitespace

        if (!username || !password) {
            dispatch(setErrorMessage('Username and Password Required'));
            setTimeout(() => {
                dispatch(setErrorMessage(null));
            }, 5000);
            return;
        }

        const authStatus = await authService.login({username, password})
            .catch(error => {
                dispatch(setErrorMessage(error.response.data));
                clearTimeout(timerId.current);
                timerId.current = setTimeout(() => {
                    dispatch(setErrorMessage(null));
                }, 5000);
            });

        console.log('still hitting after err');
        console.log('authStatus', authStatus);
        if (authStatus && authStatus.message === 'success')
            navigate('/home', {replace: true});
        else {
            dispatch(setIsError(true));
            clearTimeout(timerId.current);
            timerId.current = setTimeout(() => {
                dispatch(setIsError(false));
                // dispatch(setErrorMessage(authStatus.error));
            }, 5000);
        }
    }

    return (
        <>
            <IndexForm submitHandler={handleLogin}/>
        </>
    );
}
export default Login;
