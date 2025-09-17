import { PokemonClient } from "pokenode-ts";

const pokemonClient = new PokemonClient();

// NOTE: We bind and re-export the methods to the client instance to preserve
// the "this" context, so we can use them like this:
// const fetchOutput = useFetch(listPokemons);
export const listPokemons = pokemonClient.listPokemons.bind(pokemonClient);

export const getPokemonById = pokemonClient.getPokemonById.bind(pokemonClient);
