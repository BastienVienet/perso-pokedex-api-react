import {useQuery} from "react-query";
import {RestRef} from "../types";
import {pokemonService} from "../pokemonService";
import React from "react";
import {Chip, DialogContent, DialogTitle, Paper, styled} from "@mui/material";
import {addLeadingZeros, firstLetterToUpperCase} from "../utils";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const PokemonCardDetails = ({pokemonRef}: { pokemonRef: RestRef }) => {

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    // fetch pokemon details query
    const pokemonDetailsQuery = useQuery(['pokemonDetails', pokemonRef],
        () => pokemonService.fetchPokemonDetails(pokemonRef),
        {
            staleTime: Infinity
        })

    // fetch pokemon types query
    const pokemonTypeQuery = useQuery(['pokemonTypes', pokemonRef.name],
        () => pokemonService.fetchPokemonTypes(pokemonDetailsQuery.data?.types.map((type) => type.type) || []),
        {
            staleTime: Infinity,
            enabled: !!pokemonDetailsQuery.data
        })

    // Bool to see if the 2 queries succeeded with the right data
    const displayDetails = !!pokemonTypeQuery.data && !!pokemonDetailsQuery.data

    let array = pokemonTypeQuery.data?.map(w => w.damage_relations.double_damage_from)
    const newArray = array?.reduce((accumulator: string[], currentValue) => {
            const stringArray = currentValue.map(w => w.name)
            return [...accumulator, ...stringArray]
        },
        [])
    const uniqWeakness = [...new Set(newArray)];

    let sprite = ""
    if (displayDetails && pokemonDetailsQuery.data.sprites.other['official-artwork'].front_default) {
        sprite = pokemonDetailsQuery.data.sprites.other['official-artwork'].front_default
    }

    let type: string[] = []
    if (displayDetails && pokemonDetailsQuery.data.types.map(type => type.type.name)) {
        type = pokemonDetailsQuery.data.types.map(type => type.type.name)
    }


    const pokemonName = displayDetails && firstLetterToUpperCase(pokemonDetailsQuery.data.name)

    return (
        <>
            <DialogTitle id="customized-dialog-title">
                {displayDetails ? '#' + addLeadingZeros(pokemonDetailsQuery.data.id) + ' - ' + pokemonName : ''}
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} p={2}>
                    <Grid xs={6} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Box
                            component="img"
                            sx={{height: "25vh"}}
                            alt={`Image of the Pokemon ${pokemonName}`}
                            src={sprite}
                        />
                    </Grid>
                    <Grid xs={6} sx={{display: "flex", flexDirection: "column"}}>
                        <Item sx={{m:2}}>
                            <Box sx={{p: 2}}>
                                Type of {pokemonName}<br/>
                                {type.map(u => <Chip label={u.toUpperCase()}></Chip>)}
                            </Box>
                        </Item>
                        <Item  sx={{m:2}}>
                            <Box sx={{p: 2}}>
                                Weaknesses of {pokemonName}<br/>
                                {uniqWeakness.map(u => <Chip label={u.toUpperCase()}></Chip>)}
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </DialogContent>
        </>
    )
}