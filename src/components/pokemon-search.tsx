import React, { useState } from 'react';
import { usePokemonSearch } from 'src/hooks/use-pokemon-search-hook';

function PokemonSearchComponent() {
    const [trainerValue, setTrainerValue] = useState('');
    const [pokemonValue, setPokemonValue] = useState('');
    const data = usePokemonSearch(trainerValue, pokemonValue);

    const handleTrainerChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTrainerValue(event.target.value);
    };

    const handlePokemonChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPokemonValue(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={trainerValue}
                onChange={handleTrainerChange}
                placeholder="Trainer"
            />
            <input
                type="text"
                value={pokemonValue}
                onChange={handlePokemonChange}
                placeholder="Pokemon"
            />
            {/* Render your data here */}
            {data.results.length > 0 && (
                <div>
                    {data.results.map((result, i) => (
                        <div key={i}>
                            <h2>{result.species}</h2>
                            <p>{result.set}</p>
                            <p>{result.nature}</p>
                            <p>{result.item}</p>
                            <p>{result.evs}</p>
                            <p>{result.moves.join(', ')}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PokemonSearchComponent;
