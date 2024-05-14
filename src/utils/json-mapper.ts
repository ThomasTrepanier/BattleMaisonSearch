/* eslint-disable @typescript-eslint/no-explicit-any */
import { Nature, Pokemon, PokemonSet, PokemonSets } from 'src/model/pokemon';

export const jsonToPokemonSets = (json: any): PokemonSets => {
    const pokemonSets: PokemonSets = {};

    Object.keys(json).forEach((pokemonName) => {
        const sets: PokemonSet[] = [];

        json[pokemonName].forEach((set: any) => {
            sets.push({
                species: set['Species'],
                set: set['Set'],
                nature: set['Nature'],
                item: set['Item'],
                evs: set['EVs'],
                moves: set['Moves'],
            });
        });
        pokemonSets[pokemonName] = sets;
    });

    return pokemonSets;
};

export const jsonToNatures = (json: any): Nature[] => {
    const natures: Nature[] = [];

    Object.keys(json).forEach((natureName) => {
        const lowerCaseName = natureName.toLowerCase();
        const nature = json[natureName];
        natures.push({
            name: lowerCaseName,
            increasedStat: nature['raises'],
            decreasedStat: nature['lowers'],
        });
    });

    return natures;
};

export const jsonToPokemon = (json: any): Pokemon[] => {
    console.log(json['pokemons'][0]['Bulbasaur']);
    return Object.keys(json['pokemons'][0]).map<Pokemon>((pokemonName) => ({
        name: pokemonName,
        number: json['pokemons'][0][pokemonName]['numero'],
    }));
};
