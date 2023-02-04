import {Button, Flex, Heading, Input, Text} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {changeView} from "../features/indexView/indexView";

const Login = () => {
    const dispatch = useDispatch();

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" shadow={"0 0 0.5em hsl(220deg 40% 40%)"} p={12} rounded={6}>
                <Heading mb={6}>Login</Heading>
                <Input placeholder={"Username"} variant={"filled"} mb={3} type={"input"}/>
                <Input placeholder={"Password"} variant={"filled"} mb={6} type={"password"}/>
                <Button colorScheme={"teal"} mb={3}>Login</Button>
                <Text _hover={{cursor: "pointer"}} onClick={() => dispatch(changeView())} color={"blue.500"}>Not a User? <strong>Register</strong></Text>
            </Flex>
        </Flex>);
}
export default Login;
