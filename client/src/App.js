import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import Views from "./components/Views";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <ToastContainer autoClose={5000} />
                <Views />
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
