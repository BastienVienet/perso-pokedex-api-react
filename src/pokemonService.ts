// Fetch datas
import axios from "axios";
import {ApiPokemonDataResults, ApiPokemonTypeResults, ApiResults, RestRef} from "./types";

export const pokemonService = {

    fetchPokemons: async () => {
        const pokemonListQuery = await axios.get<ApiResults>('https://pokeapi.co/api/v2/pokemon?limit=151')
        return pokemonListQuery.data.results
    },

    fetchPokemonDetails: async (pokemonRef: RestRef) => {
        const pokemonDataQuery = await axios.get<ApiPokemonDataResults>(pokemonRef.url)
        return pokemonDataQuery.data
    },

    fetchPokemonTypes: async (typeRefs: RestRef[]) => {
        const promises = await Promise.all(typeRefs.map((typeRef) => axios.get<ApiPokemonTypeResults>(typeRef.url)))
        return promises.map((p) => p.data)
    },

}


