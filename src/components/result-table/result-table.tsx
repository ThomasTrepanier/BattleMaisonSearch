import { PokemonSearchResults } from 'src/model/pokemon';
import './result-table.scss';

interface IProps {
    pokemonSearchResults: PokemonSearchResults;
}

function ResultTableComponent({ ...props }: IProps) {
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
                                        <td>{result.species}</td>
                                        <td>{result.set}</td>
                                        <td>{result.nature}</td>
                                        <td>{result.item}</td>
                                        {result.moves.map((move, j) => (
                                            <td key={j}>{move}</td>
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
