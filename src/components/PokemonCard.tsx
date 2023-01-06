import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import {ApiPokemonDataResults, RestRef} from "../types";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import {firstLetterToUpperCase, addLeadingZeros} from "../utils";
import {pokemonService} from "../pokemonService";

type Props = {
    pokemonRef: RestRef,
}

export const PokemonCard = ({pokemonRef}: Props) => {

    const {data} = useQuery<ApiPokemonDataResults>(['pokemonDetails', pokemonRef.name],
        () => pokemonService.fetchPokemonDetails(pokemonRef),
        {
            staleTime: Infinity
        })

    let sprite = ""
    if (data && data.sprites.other['official-artwork'].front_default) sprite = data.sprites.other['official-artwork'].front_default

    return (
        <Card sx={{maxWidth: 345}}>
            <Link to={`/pokemon/${pokemonRef.name}`} style={{textDecoration: "none", color: "black"}}>
                <CardActionArea sx={{p: 2}}>
                    <CardMedia
                        sx={{objectFit: "contain", height: "20vh"}}
                        component="img"
                        image={sprite}
                        alt={firstLetterToUpperCase(pokemonRef.name)}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {firstLetterToUpperCase(pokemonRef.name)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            #{data && addLeadingZeros(data.id)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    )
}