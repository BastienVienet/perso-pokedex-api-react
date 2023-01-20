import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {ReactQueryDevtools} from "react-query/devtools";
import {NavBar} from "./NavBar"
import {PokemonCards} from "./PokemonCards";
import {PageNotFound} from "./PageNotFound";
import {LogIn} from "./LogIn";
import {ThemeContext} from "../context/ThemeContext";
import {Theme} from "../types";

export const App = () => {

    const [filter, setFilter] = useState("")
    const [user, setUser] = useState({})
    const isLogIn = Object.keys(user).length !== 0
    const navigate = useNavigate()
    const location = useLocation()
    const {themeState: [theme]} = useContext(ThemeContext)

    useEffect(() => {
        const isLogIn = Object.keys(user).length !== 0
        if (!isLogIn) {
            navigate('/login')
        } else if (location.pathname === '/login') {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [user])

    return (
        <>
            <div style={{backgroundColor: theme === Theme.Light ? '#DCDCDC' : '#313131', minHeight: '100vh'}}>
                {isLogIn &&
                    <NavBar
                        setFilter={setFilter}
                        setUser={setUser}
                    />
                }
                <Routes>
                    <Route path='/' element={
                        <PokemonCards
                            filter={filter}
                        />
                    }/>
                    <Route path='/login' element={
                        <LogIn
                            setUser={setUser}
                        />
                    }/>
                    <Route path='/pokemon/:pokemonName' element={
                        <PokemonCards
                            filter={filter}
                        />
                    }/>
                    <Route path='*' element={
                        <PageNotFound/>
                    }/>
                </Routes>
                <ReactQueryDevtools initialIsOpen={false} position='bottom-right'></ReactQueryDevtools>
            </div>
        </>
    )
        ;
}