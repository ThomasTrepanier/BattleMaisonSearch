import { useEffect, useState } from 'react';
import {
    PokemonSearchResults,
    PokemonSets,
    TeamContents,
    TrainerToTeam,
} from 'src/model/pokemon';
import { jsonToPokemonSets } from 'src/utils/json-mapper';
import { pokemonSearch } from 'src/utils/maison-search';

export function usePokemonSearch(trainerValue: string, pokemonValue: string) {
    const [data, setData] = useState<PokemonSearchResults>({ results: [] });
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

        // Call your search function here and set data
        const searchResult = pokemonSearch(
            trainerValue,
            pokemonValue,
            pokemonSets,
            trainerToTeam,
            teamContents
        );
        setData(searchResult);
        console.log('data', searchResult);
    }, [trainerValue, pokemonValue, pokemonSets, trainerToTeam, teamContents]);

    return data;
}
