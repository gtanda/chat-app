import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const useAuth = () => {
    const userInfo = useSelector(state => state.index);
    return userInfo.user && userInfo.loggedIn;
};

const PrivateRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
