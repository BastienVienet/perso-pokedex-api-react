import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import {ApiPokemonDataResults, RestRef} from "../types";
import axios from "axios";
import {useQuery} from "react-query";

type Props = {
    pokemonRef: RestRef,
}

export const PokemonCard = ({pokemonRef}: Props) => {

    const fetchPokemonDetails = async () => {
        const pokemonData = await axios.get<ApiPokemonDataResults>(pokemonRef.url)
        return pokemonData.data
    }

    const {
        isLoading,
        isFetching,
        isError,
        error,
        data
    } = useQuery<ApiPokemonDataResults, { message: string }>(['pokemonDetails', pokemonRef.name], fetchPokemonDetails, {
        staleTime: Infinity
    })

    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    let sprite = ""
    if (data && data.sprites.other['official-artwork'].front_default) sprite = data.sprites.other['official-artwork'].front_default

    function firstLetterToUpperCase(name: string) {
        name = name.toLowerCase()
        const firstLetter = name[0]
        const upperCaseFirstLetter = firstLetter.toUpperCase()
        return upperCaseFirstLetter + name.slice(1);
    }

    return (
        <Card sx={{maxWidth: 345}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="280"
                    image={sprite}
                    alt={firstLetterToUpperCase(pokemonRef.name)}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        #{data?.id} - {firstLetterToUpperCase(pokemonRef.name)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {firstLetterToUpperCase(pokemonRef.name)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}