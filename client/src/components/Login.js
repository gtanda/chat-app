import {Button, Flex, Heading, Input, Text} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {changeView} from "../features/indexView/indexView";
import {useState} from "react";
import authService from "../services/auth";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginUser = await authService.login({username, password});
        console.log(loginUser);
    }

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" shadow={"0 0 0.5em hsl(220deg 40% 40%)"} p={12} rounded={6}>
                <Heading mb={6}>Login</Heading>
                <Input placeholder={"Username"} variant={"filled"} mb={3} type={"input"}
                       onChange={(e) => setUsername(e.target.value)}/>
                <Input placeholder={"Password"} variant={"filled"} mb={6} type={"password"}
                       onChange={(e) => setPassword(e.target.value)}/>
                <Button onClick={handleLogin} colorScheme={"teal"} mb={3}>Login</Button>
                <Text _hover={{cursor: "pointer"}} onClick={() => dispatch(changeView())} color={"blue.500"}>Not a
                    User? <strong>Register</strong></Text>
            </Flex>
        </Flex>);
}
export default Login;
