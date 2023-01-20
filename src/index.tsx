import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import {App} from './components/App';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "./context/ThemeContext";

declare global {
    const google: typeof import('google-one-tap');
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
);