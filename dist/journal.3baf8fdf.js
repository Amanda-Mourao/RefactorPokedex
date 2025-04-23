const favoritesContainer = document.getElementById("favorites-container");
const fetchPokemon = async (id)=>{
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error(`Something went wrong! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
const displayFavorites = async ()=>{
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorites added!</p>";
        return;
    }
    for (const id of favorites){
        const pokemon = await fetchPokemon(id);
        if (pokemon) createPokemonCard(pokemon);
    }
};
function createPokemonCard(pokemon) {
    const header = document.createElement("div");
    header.classList.add("w-full", "flex", "justify-between", "items-center", "mb-2");
    const pokemonName = document.createElement("h2");
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonName.classList.add("text-xl", "font-bold", "mb-2");
    const pokemonHP = document.createElement("p");
    pokemonHP.textContent = `HP: ${pokemon.stats[0].base_stat}`;
    pokemonHP.classList.add("text-red-600");
    header.appendChild(pokemonName);
    header.appendChild(pokemonHP);
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("bg-white", "rounded-lg", "shadow-md", "p-4", "flex", "flex-col", "items-center", "text-center");
    pokemonCard.appendChild(header);
    const typenWrapper = document.createElement("div");
    typenWrapper.classList.add("w-full", "flex", "justify-between", "items-center", "text-left", "mb-2");
    const typenText = document.createElement("p");
    typenText.textContent = `Type: ${pokemon.types.map((typeInfo)=>typeInfo.type.name).join(", ")}`;
    typenText.classList.add("text-gray-600");
    const favStar = document.createElement("span");
    favStar.textContent = "\u2605";
    favStar.classList.add("cursor-pointer", "text-xl");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(pokemon.id)) favStar.classList.add("text-yellow-500");
    else favStar.classList.add("text-gray-400");
    favStar.addEventListener("click", ()=>{
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.includes(pokemon.id)) {
            favorites = favorites.filter((id)=>id !== pokemon.id);
            favStar.classList.replace("text-yellow-500", "text-gray-400");
        } else {
            favorites.push(pokemon.id);
            favStar.classList.replace("text-gray-400", "text-yellow-500");
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
    });
    typenWrapper.appendChild(typenText);
    typenWrapper.appendChild(favStar);
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonImage.classList.add("mb-4");
    const atde = document.createElement("div");
    atde.classList.add("w-full", "flex", "justify-center", "gap-1", "items-center", "mb-2", "text-xs");
    const pokemonAt = document.createElement("p");
    pokemonAt.textContent = `Attack: ${pokemon.stats[1].base_stat}`;
    pokemonAt.classList.add("text-gray-600");
    const pokemonDe = document.createElement("p");
    pokemonDe.textContent = `| Defense: ${pokemon.stats[2].base_stat}`;
    pokemonDe.classList.add("text-gray-600");
    atde.appendChild(pokemonAt);
    atde.appendChild(pokemonDe);
    const hewe = document.createElement("div");
    hewe.classList.add("w-full", "flex", "justify-center", "gap-1", "items-center", "mb-5", "text-xs");
    const pokemonHeight = document.createElement("h2");
    pokemonHeight.textContent = `Height: ${pokemon.height / 10}m`;
    pokemonHeight.classList.add("text-gray-600");
    const pokemonWeight = document.createElement("h2");
    pokemonWeight.textContent = `| Weight: ${pokemon.weight / 10}kg`;
    pokemonWeight.classList.add("text-gray-600");
    hewe.appendChild(pokemonHeight);
    hewe.appendChild(pokemonWeight);
    const abilityWrapper = document.createElement("div");
    abilityWrapper.classList.add("w-full", "text-left", "mt-2");
    const titel = document.createElement("span");
    titel.classList.add("font-bold", "block", "mb-1", "text-left", "w-full");
    titel.textContent = "Abilities:";
    const abilityListe = document.createElement("ul");
    abilityListe.classList.add("text-gray-600", "list-none", "text-left");
    pokemon.abilities.forEach((abilityInfo)=>{
        const li = document.createElement("li");
        li.textContent = `- ${abilityInfo.ability.name}`;
        li.classList.add("mb-1");
        abilityListe.appendChild(li);
    });
    abilityWrapper.appendChild(titel);
    abilityWrapper.appendChild(abilityListe);
    pokemonCard.appendChild(typenWrapper);
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(atde);
    pokemonCard.appendChild(hewe);
    pokemonCard.appendChild(abilityWrapper);
    favoritesContainer.appendChild(pokemonCard);
}
displayFavorites();

//# sourceMappingURL=journal.3baf8fdf.js.map
