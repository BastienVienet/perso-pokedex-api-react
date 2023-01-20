import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import {useContext} from "react";
import {ApiPokemonDataResults, RestRef, Theme} from "../types";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import {addLeadingZeros, firstLetterToUpperCase} from "../utils";
import {pokemonService} from "../pokemonService";
import {ThemeContext} from "../context/ThemeContext";

type Props = {
    pokemonRef: RestRef,
}

export const PokemonCard = ({pokemonRef}: Props) => {

    const {themeState: [theme]} = useContext(ThemeContext)

    const {data} = useQuery<ApiPokemonDataResults>(['pokemonDetails', pokemonRef.name],
        () => pokemonService.fetchPokemonDetails(pokemonRef),
        {
            staleTime: Infinity
        })

    let sprite = ""
    if (data && data.sprites.other['official-artwork'].front_default) sprite = data.sprites.other['official-artwork'].front_default

    return (
        <Card sx={{maxWidth: 345, backgroundColor: theme === Theme.Light ? 'default' : 'grey'}}>
            <Link to={`/pokemon/${pokemonRef.name}`} style={{textDecoration: "none", color: "black"}}>
                <CardActionArea sx={{p: 2}}>
                    <CardMedia
                        sx={{objectFit: "contain", height: "25vh"}}
                        component="img"
                        image={sprite}
                        alt={firstLetterToUpperCase(pokemonRef.name)}
                    />
                    <CardContent sx={{p: 0, color: theme === Theme.Light ? 'default' : 'white'}}>
                        <Typography variant="body2">
                            #{data && addLeadingZeros(data.id)}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {firstLetterToUpperCase(pokemonRef.name)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    )
}