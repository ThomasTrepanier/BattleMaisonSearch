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
        </div>
    );
}

export default App;
