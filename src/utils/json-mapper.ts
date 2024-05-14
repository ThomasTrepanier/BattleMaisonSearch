/* eslint-disable @typescript-eslint/no-explicit-any */
import { PokemonSet, PokemonSets } from 'src/model/pokemon';

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
    // return json.map({
    //     species: json['Species'],
    //     set: json['Set'],
    //     nature: json['Nature'],
    //     item: json['Item'],
    //     evs: json['EVs'],
    //     moves: json['Moves'],
    // };
};
