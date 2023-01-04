import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {NavBar} from "./NavBar"
import {PokemonCards} from "./PokemonCards";

const queryClient = new QueryClient()

export const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <NavBar />
                <PokemonCards />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right'></ReactQueryDevtools>
        </QueryClientProvider>
    );

}
