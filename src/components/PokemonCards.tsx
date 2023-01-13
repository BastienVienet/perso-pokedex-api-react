import * as React from 'react';
import {useEffect, useState} from 'react';
import {Container, Dialog} from '@mui/material';
import Grid from '@mui/material/Grid';
import {useQuery} from "react-query";
import {RestRef} from "../types";
import {PokemonCard} from "./PokemonCard";
import {useNavigate, useParams} from "react-router-dom";
import {PokemonCardDetails} from "./PokemonCardDetails";
import {pokemonService} from "../pokemonService";

export const PokemonCards = ({filter}: {filter: string}) => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => {
        setIsOpen(false);
        navigate('/')
    };

    const {pokemonName} = useParams()
    useEffect(() => {
        pokemonName && setIsOpen(true);
    }, [pokemonName]);


    const {data} = useQuery<RestRef[]>('allKantoPokemons', pokemonService.fetchPokemons, {
        staleTime: Infinity
    })

    let currentPokemon = undefined
    if (pokemonName && data) {
        currentPokemon = data.find(pkmn => pkmn.name === pokemonName)
    }

    return (
        <Container maxWidth="lg" sx={{py: 4, mt: '10vh'}}>
            <Grid container spacing={4}>
                {data && data.filter(pr => pr.name.includes(filter.toLowerCase())).map(pokemonRef =>
                    <Grid item xs={4} key={pokemonRef.name}>
                        <PokemonCard pokemonRef={pokemonRef}/>
                    </Grid>)}
            </Grid>
            <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
                {currentPokemon && <PokemonCardDetails pokemonRef={currentPokemon}/>}
            </Dialog>
        </Container>
    )
}