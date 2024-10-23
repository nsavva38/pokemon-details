const main = document.querySelector(`main`);

// fetch the pokemon from the API (don't forget async/await)
const getAllPokemon = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const responseJson = await response.json();
  console.log(responseJson);
  const allPokemon = responseJson.results;
  return allPokemon;
}

const renderAllPokemon = async () => {
  const pokemonList = await getAllPokemon();

  // create an li for each pokemon name
  const pokemonNameLIs = pokemonList.map((singlePokemon) => {
    return `<li>${singlePokemon.name}</li>`
  });
  
  // grab the ol
  const ol = document.createElement(`ol`);
  // append the li to the ol
  ol.innerHTML = pokemonNameLIs.join(``);

  main.replaceChildren(ol);

  // grab all the LIs
  const LIs = document.querySelectorAll(`li`);

  // addEventListener to each LI for when the user clicks
  LIs.forEach((singlePokemonLI) => {
    singlePokemonLI.addEventListener(`click`, async (event) => {
      renderSinglePokemon(event.target.innerText);
    });
  });
}

const renderSinglePokemon = async (pokemonName) => {
  // make a call to the poke API using the pokemon name
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const pokemonDetails = await response.json();
  // rewrite the main's innerHTML to string with the name and img
  main.innerHTML = `
    <h2>${pokemonDetails.name}</h2>

    <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}'s picture" />

    <button>Back</button>
  `;

  // grab the button
  const button = document.querySelector(`button`);

  // addEventListener to the button
  button.addEventListener(`click`, () => {
    // getAllPokemon
    renderAllPokemon();
  });
}

renderAllPokemon();
