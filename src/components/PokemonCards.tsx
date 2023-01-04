import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Container} from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from "axios";
import {useQuery} from "react-query";

type PokemonRef = {
    name: string, url: string,
}

type ApiResults = {
    count: number, next: string | null, previous: string | null, results: PokemonRef[]
}

export const PokemonCards = () => {

    const fetchPokemons = async () => {
        const query = await axios.get<ApiResults>('https://pokeapi.co/api/v2/pokemon?limit=151')
        return query.data.results
    }

    const {
        isLoading,
        isFetching,
        isError,
        error,
        data
    } = useQuery<PokemonRef[], { message: string }>('pokemon', fetchPokemons)

    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={4}>
                {data && data.map(pokemon =>
                    <Grid item xs={4}>
                        <Card sx={{maxWidth: 345}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    alt={pokemon.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {pokemon.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>)}
            </Grid>
        </Container>
    )
}