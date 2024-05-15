import { useEffect, useState } from 'react';
import {
    PokemonSearchResults,
    PokemonSets,
    TeamContents,
    TrainerToTeam,
} from 'src/model/pokemon';
import { jsonToPokemonSets } from 'src/utils/json-mapper';
import { pokemonSearch } from 'src/utils/maison-search';

export function usePokemonSearch(
    trainerValue: string,
    pokemonValues: string[]
) {
    const [data, setData] = useState<PokemonSearchResults>({ result: {} });
    const [pokemonSets, setPokemonSets] = useState<PokemonSets>({});
    const [trainerToTeam, setTrainerToTeam] = useState<TrainerToTeam>({});
    const [teamContents, setTeamContents] = useState<TeamContents>([]);

    useEffect(() => {
        fetch('/BattleMaisonSearch/data/pokemonSets.json')
            .then((response) => response.json())
            .then((json) => jsonToPokemonSets(json))
            .then((data) => setPokemonSets(data));

        fetch('/BattleMaisonSearch/data/trainerToTeam.json')
            .then((response) => response.json())
            .then((data) => setTrainerToTeam(data));

        fetch('/BattleMaisonSearch/data/teamContents.json')
            .then((response) => response.json())
            .then((data) => setTeamContents(data));
    }, []);

    useEffect(() => {
        if (!pokemonSets || !trainerToTeam || !teamContents) return;

        const searchResults = pokemonValues.map((pokemonValue) =>
            pokemonSearch(
                trainerValue,
                pokemonValue,
                pokemonSets,
                trainerToTeam,
                teamContents
            )
        );

        const results: PokemonSets = {};
        searchResults.forEach((searchResult, i) => {
            if (searchResult.error) {
                results[pokemonValues[i]] = [];
            } else {
                results[pokemonValues[i]] =
                    searchResult.result[pokemonValues[i]];
            }
        });

        const newData = {
            result: results,
        };
        setData(newData);
    }, [trainerValue, pokemonValues, pokemonSets, trainerToTeam, teamContents]);

    return data;
}
