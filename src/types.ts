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
    types: { type: RestRef }[],
    sprites: {
        other: {
            ['official-artwork']: {
                front_default: string | null
            }
        }
    },
}

export type ApiPokemonTypeResults = {
    damage_relations: {
        double_damage_from: RestRef[],
        double_damage_to: RestRef[],
        half_damage_from: RestRef[],
        half_damage_to: RestRef[],
    }
}