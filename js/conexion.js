let pokesFiltrados = [];
let totalPokes = 1025;

// Conexión para obtener la lista de Pokémon
async function Conexion(UnFiltro) {

  
  if(UnFiltro == "All"){
    //si quiero pokemones
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
    const data = await res.json();
    return data.results;
  }else{
    //si quiero por tipo
    const res = await fetch(`https://pokeapi.co/api/v2/type/${UnFiltro}`);
    const data = await res.json();

    const pokemonesTipo = [];
    for (let i = 0; i < data.pokemon.length; i++) {
      pokemonesTipo.push(data.pokemon[i].pokemon);
    }
    return pokemonesTipo;
  }

}

// Cargar todos los Pokémon al iniciar
async function General() {
  if (pokesFiltrados.length === 0) {
    pokesFiltrados = await Conexion("All");
  }
  Home();
}

General()

async function FiltroConexion(filtroelegido){
  document.getElementById("la-lista").innerHTML = "";
  pokesFiltrados = await Conexion(filtroelegido);
  const listaFiltro = generalLista(pokesFiltrados);
  document.getElementById("la-lista").innerHTML = listaFiltro;
}