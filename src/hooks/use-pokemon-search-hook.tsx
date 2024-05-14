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
        fetch('/data/pokemonSets.json')
            .then((response) => response.json())
            .then((json) => jsonToPokemonSets(json))
            .then((data) => setPokemonSets(data));

        fetch('/data/trainerToTeam.json')
            .then((response) => response.json())
            .then((data) => setTrainerToTeam(data));

        fetch('/data/teamContents.json')
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
        console.log(searchResults);

        const results: PokemonSets = {};
        searchResults.forEach((searchResult, i) => {
            if (searchResult.error) {
                results[pokemonValues[i]] = [];
            } else {
                results[pokemonValues[i]] =
                    searchResult.result[pokemonValues[i]];
            }
        });

        console.log(results);

        const newData = {
            result: results,
        };
        setData(newData);
        console.log(newData);
    }, [trainerValue, pokemonValues, pokemonSets, trainerToTeam, teamContents]);

    return data;
}
