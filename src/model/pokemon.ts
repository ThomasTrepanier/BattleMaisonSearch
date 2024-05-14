export interface PokemonSet {
    species: string;
    set: string;
    nature: string;
    item: string;
    evs: string;
    moves: string[];
}

export interface PokemonSets {
    [pokemonName: string]: PokemonSet[];
}

export interface TrainerToTeam {
    [trainerName: string]: number;
}

export type TeamContents = PokemonAvailableSets[];

interface PokemonAvailableSets {
    [pokemonName: string]: number[];
}

export interface PokemonSearchResults {
    error?: SearchError;
    result: PokemonSets;
}

export interface SearchError {
    errorType: string;
    message: string;
}

export interface Nature {
    name: string;
    increasedStat: string;
    decreasedStat: string;
}

export interface NatureByName {
    [nature: string]: Nature;
}

export interface Pokemon {
    name: string;
    number: number;
}

export interface PokemonByName {
    [name: string]: Pokemon;
}
