import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    // <StrictMode>
    <>
        <ColorModeScript />
        <Provider store={store}>
            <App />
        </Provider>
    </>
    // </StrictMode>
);
