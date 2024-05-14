import { useEffect, useState } from 'react';
import {
    NatureByName,
    PokemonByName,
    PokemonSearchResults,
} from 'src/model/pokemon';
import { jsonToNatures, jsonToPokemon } from 'src/utils/json-mapper';
import { itemToUrl, moveToUrl, speciesToUrl } from 'src/utils/url';
import './result-table.scss';

interface IProps {
    pokemonSearchResults: PokemonSearchResults;
}

function ResultTableComponent({ ...props }: IProps) {
    const [natures, setNatures] = useState<NatureByName>({});
    const [pokemons, setPokemons] = useState<PokemonByName>({});

    useEffect(() => {
        fetch('/data/natures.json')
            .then((response) => response.json())
            .then((json) => jsonToNatures(json))
            .then((natures) => {
                const natureByName: NatureByName = {};
                natures.forEach((nature) => {
                    natureByName[nature.name] = nature;
                });
                setNatures(natureByName);
            });

        fetch('/data/pokemon.json')
            .then((response) => response.json())
            .then((json) => jsonToPokemon(json))
            .then((pokemons) => {
                console.log(pokemons);
                const pokemonByName: PokemonByName = {};
                pokemons.forEach((pokemon) => {
                    pokemonByName[pokemon.name] = pokemon;
                });
                setPokemons(pokemonByName);
            });
    }, []);

    return (
        <div className="">
            <table className="result-table">
                <thead>
                    <tr>
                        <th>Species</th>
                        <th>Set</th>
                        <th>Nature</th>
                        <th>Item</th>
                        <th colSpan={4}>Moves</th>
                        <th>EVs</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(props.pokemonSearchResults.result).length >
                    0 ? (
                        Object.keys(props.pokemonSearchResults.result).map(
                            (pokemonName, i) =>
                                props.pokemonSearchResults.result[
                                    pokemonName
                                ].map((result, j) => (
                                    <tr
                                        className={`search-results species-${i}`}
                                        key={i * 5 + j}
                                    >
                                        <td>
                                            {' '}
                                            <a
                                                href={`https://www.serebii.net/pokedex-xy/${speciesToUrl(
                                                    result.species,
                                                    pokemons
                                                )}.shtml`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {result.species}
                                            </a>
                                        </td>
                                        <td>{result.set}</td>
                                        <td>{`${result.nature} (+${
                                            natures[result.nature].increasedStat
                                        }/-${
                                            natures[result.nature].decreasedStat
                                        })`}</td>
                                        <td>
                                            {' '}
                                            <a
                                                href={`https://www.serebii.net/itemdex/${itemToUrl(
                                                    result.item
                                                )}.shtml`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {result.item}
                                            </a>
                                        </td>
                                        {result.moves.map((move, j) => (
                                            <td key={j}>
                                                <a
                                                    href={`https://www.serebii.net/attackdex-xy/${moveToUrl(
                                                        move
                                                    )}.shtml`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {move}
                                                </a>
                                            </td>
                                        ))}
                                        <td>{result.evs}</td>
                                    </tr>
                                ))
                        )
                    ) : (
                        <tr className="no-results">
                            <td colSpan={9}>No pokemon was found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ResultTableComponent;
