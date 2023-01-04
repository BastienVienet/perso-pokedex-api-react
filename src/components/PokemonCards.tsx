import * as React from 'react';
import {Container} from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from "axios";
import {useQuery} from "react-query";
import {ApiResults, RestRef} from "../types";
import {PokemonCard} from "./PokemonCard";

export const PokemonCards = () => {

    const fetchPokemons = async () => {
        const query = await axios.get<ApiResults>('https://pokeapi.co/api/v2/pokemon?limit=9')
        return query.data.results
    }

    const {
        isLoading,
        isFetching,
        isError,
        error,
        data
    } = useQuery<RestRef[], { message: string }>('allKantoPokemons', fetchPokemons, {
        staleTime: Infinity
    })

    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <Container maxWidth="md" sx={{ my: 4}}>
            <Grid container spacing={4}>
                {data && data.map(pokemonRef =>
                    <Grid item xs={4}>
                        <PokemonCard pokemonRef={pokemonRef} />
                    </Grid>)}
            </Grid>
        </Container>
    )
}