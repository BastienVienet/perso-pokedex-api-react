import {useQuery} from "react-query";
import {RestRef, Theme} from "../types";
import {pokemonService} from "../pokemonService";
import React, {useContext} from "react";
import {Chip, DialogContent, DialogTitle, Paper, styled} from "@mui/material";
import {addLeadingZeros, firstLetterToUpperCase} from "../utils";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {ThemeContext} from "../context/ThemeContext";

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

    const {themeState: [theme]} = useContext(ThemeContext)

    return (
        <>
            <div style={{backgroundColor: theme === Theme.Light ? 'default' : '#313131'}}>
                <DialogTitle id="customized-dialog-title" sx={{color: theme === Theme.Light ? 'default' : 'white'}}>
                    {displayDetails ? '#' + addLeadingZeros(pokemonDetailsQuery.data.id) + ' - ' + pokemonName : ''}
                </DialogTitle>
                <DialogContent dividers sx={{borderColor: theme === Theme.Light ? 'default' : 'white', borderBottom: 'hidden'}}>
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
                            <Item sx={{m: 2, backgroundColor: theme === Theme.Light ? 'default ' : 'grey'}}>
                                <Box sx={{p: 2, color: theme === Theme.Light ? 'default' : 'white'}}>
                                    Type of {pokemonName}<br/>
                                    {type.map(u => <Chip label={u.toUpperCase()} sx={{color: theme === Theme.Light ? 'default' : 'white'}}></Chip>)}
                                </Box>
                            </Item>
                            <Item sx={{m: 2, backgroundColor: theme === Theme.Light ? 'default' : 'grey'}}>
                                <Box sx={{p: 2, color: theme === Theme.Light ? 'default' : 'white'}}>
                                    Weaknesses of {pokemonName}<br/>
                                    {uniqWeakness.map(u => <Chip label={u.toUpperCase()} sx={{color: theme === Theme.Light ? 'default' : 'white'}}></Chip>)}
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </DialogContent>
            </div>
        </>
    )
}