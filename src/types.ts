export type RestRef = {
    name: string,
    url: string,
}

export type ApiResults = {
    count: number,
    next: string | null,
    previous: string | null,
    results: RestRef[]
}

export type ApiPokemonDataResults = {
    id: number,
    name: string,
    type: RestRef[],
    sprites: {
        other: {
            ['official-artwork']: {
                front_default: string | null
            }
        }
    },
}