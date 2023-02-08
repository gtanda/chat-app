import { Button, Flex, FormControl, Heading, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { changeView, changeUserName, changePassword, setShow } from "../../reducers/indexPage";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    username: yup.string().required().min(5).max(15),
    password: yup.string().required().min(6).max(28),
});

const IndexForm = ({ submitHandler, buttonName, formText, headingText }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const show = useSelector(state => state.index.show);
    const errorMessage = useSelector(state => state.index.errorMessage);

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Flex direction="column" shadow={"0 0 0.5em hsl(220deg 40% 40%)"} p={12} rounded={6}>
                    <Heading mb={6}>{headingText}</Heading>
                    <Text color={"red.500"} mb={3}>
                        {errorMessage}
                    </Text>
                    <FormControl>
                        <Input
                            {...register("username")}
                            isRequired
                            placeholder={"Enter Username"}
                            variant={"filled"}
                            mb={3}
                            type={"input"}
                            onChange={e => dispatch(changeUserName(e.target.value.trim()))}
                        />
                        {errors ? (
                            <Text color={"red.500"} mb={3}>
                                {errors?.username?.message}
                            </Text>
                        ) : null}
                        <InputGroup size={"md"}>
                            <Input
                                {...register("password")}
                                isRequired
                                placeholder={"Enter Password"}
                                variant={"filled"}
                                pr={"4.5rem"}
                                mb={3}
                                mt={3}
                                type={show ? "text" : "password"}
                                onChange={e => dispatch(changePassword(e.target.value.trim()))}
                            />
                            <InputRightElement mt={3}>
                                <Button
                                    h={"1.75rem"}
                                    pr={"1.5rem"}
                                    pl={"1.5rem"}
                                    mr={"1.5rem"}
                                    size={"md"}
                                    onClick={() => dispatch(setShow(!show))}
                                >
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {errors?.password?.message ? (
                            <Text color={"red.500"} mb={3}>
                                {errors?.password?.message}
                            </Text>
                        ) : null}
                        <Button type="submit" colorScheme={"teal"} mb={3}>
                            {buttonName}
                        </Button>
                        <Text _hover={{ cursor: "pointer" }} onClick={() => dispatch(changeView())} color={"blue.500"}>
                            {formText.p1}
                            <strong>{formText.p2}</strong>
                        </Text>
                    </FormControl>
                </Flex>
            </Flex>
        </form>
    );
};

export default IndexForm;
