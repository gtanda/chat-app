import {useRef, useState} from "react";
import {Input, InputGroup, InputRightElement, Button} from "@chakra-ui/react";

const HomePage = () => {
    const socket = new WebSocket('ws://localhost:3001');
    const renderCounter = useRef(0);
    const [message, setMessage] = useState('');
    renderCounter.current++;
    socket.onopen = (() => {
        console.log('connecting to server');
    });

    const handleClick = (e) => {
        e.preventDefault();
        if (message) {
            socket.send(message);
        }
        setMessage('');
    }

    return (
        <div>
            <h1>Home Page {renderCounter.current}</h1>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={'text'}
                    placeholder='Enter Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        Send
                    </Button>
                </InputRightElement>
            </InputGroup>
        </div>
    )
}

export default HomePage;
