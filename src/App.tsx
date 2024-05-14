import './App.css';
import SearchInputComponent from './components/search-inputs/search-inputs';

function App() {
    return (
        <div className="main-body">
            <h1>Battle Maison Search Engine</h1>

            <p>
                This is a simple search enginne for finding data about trainers
                and Pokemons in the X/Y and ORAS Battle Maisons
            </p>
            <SearchInputComponent></SearchInputComponent>
            <p className="helpers">
                Enter "*" for the trainer name to get every set for the given
                Pokemon
            </p>
            <p className="helpers">Click on a result to toggle a highlight</p>

            <p style={{ fontWeight: 'bold' }}>
                This search engine is based on the one made by Dshepsis. He
                provided the data and the query methods used on this site.
            </p>
            <a
                href="https://github.com/dshepsis/BattleMaisonSearch"
                rel="noopener noreferrer"
            >
                You can see the original repo here
            </a>
        </div>
    );
}

export default App;
