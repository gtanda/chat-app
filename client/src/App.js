import React from 'react';
import {ChakraProvider, theme} from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {ColorModeSwitcher} from './components/ColorModeSwitcher';
import IndexPage from "./components/IndexPage";
import HomePage from "./components/HomePage";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <ColorModeSwitcher/>
            <Router>
                <Routes>
                    <Route path="/" element={<IndexPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
