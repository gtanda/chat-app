import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import IndexPage from "./components/IndexPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <IndexPage />
    </ChakraProvider>
  );
}

export default App;
