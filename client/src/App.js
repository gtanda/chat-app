import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import Views from "./components/Views";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <ColorModeSwitcher />
            <ToastContainer autoClose={5000} />
            <Views />
        </ChakraProvider>
    );
}

export default App;
