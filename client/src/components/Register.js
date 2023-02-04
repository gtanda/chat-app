import {Button, Flex, Heading, Input, Text} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {changeView} from "../features/indexView/indexView";

const Register = () => {
    const dispatch = useDispatch();

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" shadow={"0 0 0.5em hsl(220deg 40% 40%)"} p={12} rounded={6}>
                <Heading mb={6}>Register</Heading>
                <Input placeholder={"Username"} variant={"filled"} mb={3} type={"email"}/>
                <Input placeholder={"Password"} variant={"filled"} mb={6} type={"password"}/>
                <Button colorScheme={"teal"} mb={3}>Register</Button>
                <Text _hover={{cursor: "pointer"}} onClick={() => dispatch(changeView())} color={"blue.500"}>Already a user? <strong>Login</strong></Text>
            </Flex>
        </Flex>);
}

export default Register;
