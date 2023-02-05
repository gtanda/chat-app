import {Button, Flex, Heading, Input, Text} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {changeView} from "../features/indexView/indexView";
import {useState} from "react";
import authService from "../services/auth";
import auth from "../services/auth";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        const registeredUser = await authService.register({username, password});
        console.log(registeredUser);
    }

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" shadow={"0 0 0.5em hsl(220deg 40% 40%)"} p={12} rounded={6}>
                <Heading mb={6}>Register</Heading>
                <Input placeholder={"Username"} variant={"filled"} mb={3} type={"email"}
                       onChange={(e) => setUsername(e.target.value)}/>
                <Input placeholder={"Password"} variant={"filled"} mb={6} type={"password"}
                       onChange={(e) => setPassword(e.target.value)}/>
                <Button colorScheme={"teal"} mb={3} onClick={handleRegister}>Register</Button>
                <Text _hover={{cursor: "pointer"}} onClick={() => dispatch(changeView())} color={"blue.500"}>Already a
                    user? <strong>Login</strong></Text>
            </Flex>
        </Flex>);
}

export default Register;
