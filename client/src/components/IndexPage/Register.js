import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputRightElement,
  Text,
  InputGroup,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { changeView } from '../../reducers/indexPage';
import { useRef, useState } from 'react';
import authService from '../../services/auth';
import auth from '../../services/auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const timerId = useRef(null);

  const handleRegister = async e => {
    e.preventDefault();
    const userCheck = username.replace(/\s/g, ''); // remove whitespace
    if (
      !userCheck ||
      !password ||
      !userCheck.match(/^[a-zA-Z0-9]+$/) ||
      !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    ) {
      setIsError(true);
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        setIsError(false);
      }, 8000);
      return;
    }

    const registeredUser = await authService.register({ username, password });
    console.log(registeredUser);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        shadow={'0 0 0.5em hsl(220deg 40% 40%)'}
        p={12}
        rounded={6}
      >
        <Heading mb={6}>Register</Heading>
        <FormControl isInvalid={isError}>
          <Input
            placeholder={'Username'}
            variant={'filled'}
            mb={3}
            type={'email'}
            onChange={e => setUsername(e.target.value.trim())}
          />
          <InputGroup size={'md'}>
            <Input
              placeholder={'Password'}
              variant={'filled'}
              mb={6}
              type={show ? 'text' : 'password'}
              onChange={e => setPassword(e.target.value.trim())}
            />
            <InputRightElement>
              <Button
                h="1.75rem"
                pr={'1.5rem'}
                pl={'1.5rem'}
                mr={'1.5rem'}
                size="md"
                onClick={() => setShow(!show)}
              >
                Show{' '}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button colorScheme={'teal'} mb={3} onClick={handleRegister}>
            Register
          </Button>
          <Text
            _hover={{ cursor: 'pointer' }}
            onClick={() => dispatch(changeView())}
            color={'blue.500'}
          >
            Already a user? <strong>Login</strong>
          </Text>
          {isError ? (
            <FormErrorMessage>
              Valid Username (<strong>Alphanumeric only</strong>) and Password (
              <strong>
                Must contain 1 digit, uppercase and lowercase character, and be
                between 6 to 20 characters
              </strong>
              ) required.
            </FormErrorMessage>
          ) : null}
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Register;
