/**
 * Validates the user inputs from the form and calls pkSearch() to find the
 * relevant information. Then, adds to result to the interface with DOM
 * commands:
 */
// export function search (trainerValue: string, pokemonValue: string) {
//   var trainerName = trainerForm.value.toLowerCase().trim();
//   if (trainerName === "") {
//     resultsTable.style.display = "none";
//     return;
//   }
//   /* Special case for the trainer O'Hare. I do this because the apostrophe in
//    * his name is weird and I suspect some people might try to use other
//    * symbols like the grave mark `. This just catches all conceivable
//    * variations (e.g. "O`hare", "O-hare", "ohare", "o hare", etc.): */
//   if (/o\W*hare/.test(trainerName)) {
//     trainerName = "o'hare";
//   }

import {
    PokemonSearchResults,
    PokemonSets,
    TeamContents,
    TrainerToTeam,
} from '../model/pokemon';

//   var pokemonName = pokemonForm.value.toLowerCase().trim();
//   if (pokemonName === "") {
//     resultsTable.style.display = "none";
//     return;
//   }
//   /* At this point we've determined we have enough data to run a search,
//    * which will get us either an error or a valid result.
//    * Either way, the table needs to be made visible now so that the results
//    * can be displayed later: */
//   resultsTable.style.display = "table";

//   /* Get relevant data: */
//   var results = pkSearch(trainerName, pokemonName);

//   /* Then display the results: */
//   /* First, clear out the table: */
//   while (resultsTable.firstChild) {
//     resultsTable.removeChild(resultsTable.firstChild);
//   }

//   /* Use document fragment to avoid multiple changes to the DOM: */
//   var docFrag = document.createDocumentFragment();

//   /* If we got an error response, display it: */
//   if (results.Error) {
//     /* Set an error class so that error messages can be styled differently: */
//     resultsTable.className = "search-error";

//     var header = makeTableRow("Error!", "th");
//     docFrag.appendChild(header);

//     var body = makeTableRow(results.Message);
//     docFrag.appendChild(body);
//   }
//   /* If we did not get an error, display the response normally: */
//   else {
//     /* If we found a result, override any other classes on the element: */
//     resultsTable.className = "search-results";

//     /* Create header: */
//     var headerItems = ["Species", "Set", "Nature", "Item", "Moves", "EVs"];
//     var colSpans =    [1,          1,     1,        1,      4,       1];

//     var header = makeTableRow(headerItems, "th");
//     var numFields = headerItems.length
//     /* For fields meant to be wider than 1 column, set their colspan attribute: */
//     for (var col = 0; col < numFields; ++col) {
//       header.children[col].colSpan = colSpans[col];
//     }
//     docFrag.appendChild(header);

//     /* Create body: */
//     /* Add a row for each result: */
//     var resLength = results.length;
//     for (var row = 0; row < resLength; ++row) {
//       var bodyRow = makeElement("tr");
//       var thisResult = results[row];

//       /* Add a column for each field of a result: */
//       for (var col = 0; col < numFields; ++col) {
//         var field = thisResult[ headerItems[col] ];

//         /* Special handling for array fields: */
//         if (Array.isArray(field)) {
//           var len = field.length;
//           /* If the length of the field is wrong, give an error in console: */
//           if (len !== colSpans[col]) {
//             console.error("Unexpected Field Length at row " + row + ", column " + col + ".");
//           }

//           /* Otherwise, add in the sub-fields to the table: */
//           for (var i = 0; i < len; ++i) {
//             bodyRow.appendChild( makeElement("td", field[i]) );
//           }
//         }

//         /* Handling for normal, single-datum fields: */
//         else {
//           bodyRow.appendChild( makeElement("td", field) );
//         }
//       } //Close column-making for-loop
//       /* The row for this result is now complete. Give it a click event handler
//        * so that the user can click on a row to highlight it, and add it to the
//        * fragment element: */
//       bodyRow.onclick = clickToHighlight;
//       bodyRow.onmousedown = preventClickToHighlight;
//       docFrag.appendChild(bodyRow);
//     }
//   }
//   /* Add the result to the table so the user can see it: */
//   resultsTable.appendChild(docFrag);
// }

/**
 * Main searching function. Takes in a trainer and pokemon name, and returns
 * the information about the sets of said pokemon which said trainer uses.
 * For example, trainer Mara uses two sets for Conkeldurr: set 2 and set 4.
 * So,
 *   pksearch("mara", "conkeldurr")
 * Will yield results for sets 2 and 4 of Conkeldurr, as listed in the
 * pokemonSets.json file.
 *
 * NOTE: Both parameters must be lowercosed, and must contain the proper symbols.
 * For example, the trainer Marie-Noelle must be passed as "marie-noelle", NOT
 * "Marie-noelle" or "marie noelle" or "marienoelle" etc. Porygon-Z must be
 * passed as "porygon-z", NOT "porygon-Z" or "porygonz" or "porygon_z".
 */
export function pokemonSearch(
    trainerValue: string,
    pokemonValue: string,
    pokemonSets: PokemonSets,
    trainerToTeam: TrainerToTeam,
    teamContents: TeamContents
): PokemonSearchResults {
    let trainerName = trainerValue.toLowerCase().trim();
    if (trainerName === '') {
        return {
            error: {
                errorType: 'badTrainer',
                message: 'No trainer name was provided.',
            },
            results: [],
        };
    }
    /* Special case for the trainer O'Hare. I do this because the apostrophe in
     * his name is weird and I suspect some people might try to use other
     * symbols like the grave mark `. This just catches all conceivable
     * variations (e.g. "O`hare", "O-hare", "ohare", "o hare", etc.): */
    if (/o\W*hare/.test(trainerName)) {
        trainerName = "o'hare";
    }

    console.log(trainerName);

    const pokemonName = pokemonValue.toLowerCase().trim();

    console.log(pokemonName);

    /* SPECIAL CASE: Wildcard trainer: */
    if (trainerName === '*') {
        const allSets = pokemonSets[pokemonName];
        /* If the name isn't valid: */
        if (allSets === undefined) {
            return {
                error: {
                    errorType: 'badPokemon',
                    message:
                        'There is no Pokemon called ' +
                        pokemonName +
                        ' in the Battle Maison.',
                },
                results: [],
            };
        }
        /* Otherwise, return every set for the pokemon: */
        return { results: allSets };
    }

    /* Find the number of the team used by the parameter trainer */
    const teamNumber = trainerToTeam[trainerName];
    /* Bad Trainer error: */
    if (teamNumber === undefined) {
        return {
            error: {
                errorType: 'badTrainer',
                message: 'Trainer ' + trainerName + ' does not exist.',
            },
            results: [],
        };
    }

    /* If the team found is outside of the valid range of teams, throw an error:
     * NOTE: I don't actually expect this to ever fire. If it does, that means
     *   the data files have an error. */
    if (
        !Number.isInteger(teamNumber) ||
        teamNumber < 0 ||
        teamNumber >= Object.keys(teamContents).length
    ) {
        console.error(teamNumber + ' is not a valid team number!');
    }

    /* Then check the sets for the parameter pokemon which are used by the team
     * used by the parameter trainer.
     * NOTE: While many trainers only use 1 set for any given pokemon, others
     * can use multiple, sometimes all 4: */
    const setsForPokemon = teamContents[teamNumber][pokemonName];
    /* Bad Pokemon error: */
    if (setsForPokemon === undefined) {
        return {
            error: {
                errorType: 'badPokemon',
                message:
                    'Trainer ' +
                    trainerName +
                    ' does not use the Pokemon ' +
                    pokemonName +
                    '.',
            },
            results: [],
        };
    }
    /* Will contain the data about each pokemon which I found: */
    const setData = [];
    /* Storing the entire array of set-data-objects for this specific pokemon: */
    const individualPokemonSetData = pokemonSets[pokemonName];
    const length = setsForPokemon.length;
    for (let i = 0; i < length; ++i) {
        /* Because the arrays in teamNumber use the 1-based indexing which is used
         * in the original text data (e.g. Muk1, Muk2, Muk3, Muk4), we subtract 1
         * from the index values: */
        setData[i] = individualPokemonSetData[setsForPokemon[i] - 1];
    }

    return {
        results: setData,
    };
}
