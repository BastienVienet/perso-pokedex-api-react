import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import {App} from './components/App';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "./context/ThemeContext";
import {QueryClient, QueryClientProvider} from "react-query";

declare global {
    const google: typeof import('google-one-tap');
}
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </ThemeProvider>
    </BrowserRouter>
);