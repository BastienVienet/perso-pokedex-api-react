import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {NavBar} from "./NavBar"
import {PokemonCards} from "./PokemonCards";
import {PageNotFound} from "./PageNotFound";

const queryClient = new QueryClient()

export const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path='/' element={<PokemonCards/>}/>
                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right'></ReactQueryDevtools>
        </QueryClientProvider>
    );

}
