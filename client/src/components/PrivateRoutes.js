import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const useAuth = () => {
    const user = useSelector(state => state.index);
    return user && user.loggedIn;
};

const PrivateRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
