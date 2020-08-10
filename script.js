$("#button").on("click", async (e) => {
    e.preventDefault();

    const pokemon = $("#pokemon").val();
    if (!pokemon) return alert("Please enter a Pokémon name!");

    const data = await fetchPokemon(pokemon);

    if (!data) return alert("Not found!");

    const html = `<div class="card bg-secondary text-white mt-5 pokecard" style="width: 18rem;">
    <img src="${data.image}" class="card-img-top" alt="pokemon" draggable="false">
    <div class="card-body">
        <h5 class="card-title">${data.name} (#${data.id})</h5>
        <p class="card-text">Type: <b>${data.type}</b></p>
    </div>
    </div>`;

    $(".contents").html(html);
});

function fetchPokemon(pokemon) {
    return new Promise((resolve) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.json())
        .then(json => {
            const data = {
                id: json.id,
                name: json.name.charAt(0).toUpperCase()+json.name.slice(1).toLowerCase(),
                image: `https://pokeres.bastionbot.org/images/pokemon/${json.id}.png`,
                type: json.types.map((m) => m.type.name.charAt(0).toUpperCase() + m.type.name.slice(1).toLowerCase()).join(" | ")
            };

            resolve(data);
        })
        .catch(() => resolve(false));
    }); 
}