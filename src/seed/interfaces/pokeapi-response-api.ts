export interface PokeResponse {
  count: number;
  next: null;
  previous: null;
  results: SmallPokemon[];
}

export interface SmallPokemon {
  name: string;
  url: string;
}
