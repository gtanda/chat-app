import React from 'react';
import {ChakraProvider, theme} from '@chakra-ui/react';
import {ColorModeSwitcher} from './components/ColorModeSwitcher';
import Views from "./components/Views";
function App() {
    return (
        <ChakraProvider theme={theme}>
            <ColorModeSwitcher/>
            <Views />
        </ChakraProvider>
    );
}

export default App;
