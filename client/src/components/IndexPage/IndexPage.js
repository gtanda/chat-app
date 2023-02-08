import Login from "./Login";
import Register from "./Register";
import { useSelector } from "react-redux";

const IndexPage = () => {
    const displayLoginOrRegister = useSelector(state => state.index.value);
    return displayLoginOrRegister ? <Login /> : <Register />;
};

export default IndexPage;
