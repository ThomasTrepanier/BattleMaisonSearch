import { PokemonByName } from 'src/model/pokemon';

export const moveToUrl = (move: string): string => {
    return move.replace(' ', '').toLowerCase();
};

export const itemToUrl = (item: string): string => {
    return item.replace(' ', '').toLowerCase();
};

export const speciesToUrl = (
    species: string,
    pokemonsByName: PokemonByName
): string => {
    return pokemonsByName[species].number.toString().padStart(3, '0');
};
