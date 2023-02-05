import {Button, Flex, FormControl, FormLabel, Heading, Input, Text, FormErrorMessage} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {changeView} from "../features/indexView/indexView";
import {useRef, useState} from "react";
import authService from "../services/auth";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const timerId = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        const userCheck = username.replace(/\s/g, ''); // remove whitespace
        if (!userCheck || !password) {
            setIsError(true);
            clearTimeout(timerId.current);
            timerId.current = setTimeout(() => {
                setIsError(false);
            }, 5000);
            return;
        }

        const loginUser = await authService.login({username, password});
        console.log('loginUser', loginUser);
    }


    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" shadow={"0 0 0.5em hsl(220deg 40% 40%)"} p={12} rounded={6}>
                <Heading mb={6}>Login</Heading>
                <FormControl isInvalid={isError}>
                    <Input placeholder={"Username"} variant={"filled"} mb={3} type={"input"}
                           onChange={(e) => setUsername(e.target.value.trim())}/>
                    <Input placeholder={"Password"} variant={"filled"} mb={6} type={"password"}
                           onChange={(e) => setPassword(e.target.value.trim())}/>
                    <Button onClick={handleLogin} colorScheme={"teal"} mb={3}>Login</Button>
                    <Text _hover={{cursor: "pointer"}} onClick={() => dispatch(changeView())} color={"blue.500"}>Not a
                        User? <strong>Register</strong></Text>
                    {isError ? <FormErrorMessage><strong>Valid Username and Password required.</strong></FormErrorMessage>: null}
                </FormControl>
            </Flex>
        </Flex>);
}
export default Login;
