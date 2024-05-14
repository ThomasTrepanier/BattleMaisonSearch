import React, { useState } from 'react';
import { usePokemonSearch } from 'src/hooks/use-pokemon-search-hook';
import ResultTableComponent from '../result-table/result-table';
import './search-inputs.scss';

function SearchInputComponent() {
    const [nbOfPokemons, setNbOfPokemons] = useState<number>(1);
    const [trainerValue, setTrainerValue] = useState('');
    const [pokemonValues, setPokemonValues] = useState<string[]>(
        Array.from({ length: nbOfPokemons }, () => '')
    );
    const data = usePokemonSearch(trainerValue, pokemonValues);

    const handleTrainerChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTrainerValue(event.target.value);
    };

    const handlePokemonChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newPokemonValues = [...pokemonValues];
        newPokemonValues[index] = event.target.value;
        setPokemonValues(newPokemonValues);
    };

    const handleNumberOfPokemonChanges = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newNbOfPokemons = parseInt(event.target.value);
        setNbOfPokemons(newNbOfPokemons);
        setPokemonValues(Array.from({ length: newNbOfPokemons }, () => ''));
    };

    return (
        <>
            <div className="search-input-container">
                <input
                    className="trainer-input"
                    type="text"
                    value={trainerValue}
                    onChange={handleTrainerChange}
                    placeholder="Trainer"
                />
                <select
                    className="nb-pokemon-select"
                    onChange={handleNumberOfPokemonChanges}
                >
                    <option value="1">1v1</option>
                    <option value="2">2v2</option>
                    <option value="3">3v3</option>
                </select>
                <div className="pokemon-input-container">
                    {Array.from({ length: nbOfPokemons }).map((_, i) => (
                        <input
                            key={i}
                            className="pokemon-input"
                            type="text"
                            value={pokemonValues[i]}
                            onChange={(event) => handlePokemonChange(event, i)}
                            placeholder={`Pokemon #${i + 1}`}
                        />
                    ))}
                </div>
            </div>
            <ResultTableComponent
                pokemonSearchResults={data}
            ></ResultTableComponent>
        </>
    );
}

export default SearchInputComponent;
