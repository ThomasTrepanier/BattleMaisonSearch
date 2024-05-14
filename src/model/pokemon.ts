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
    results: PokemonSet[];
}

export interface SearchError {
    errorType: string;
    message: string;
}
