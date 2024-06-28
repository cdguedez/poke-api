import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/pokeapi-response-api';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  // TODO: colocar axios como una dependencia externa
  private readonly axios: AxiosInstance = axios;
  private readonly URL: string = 'https://pokeapi.co/api/v2/pokemon';

  async execSeeds({ limit, offset }) {
    await this.pokemonModel.deleteMany({});
    const { data } = await this.axios.get<PokeResponse>(
      `${this.URL}?limit=${limit}&offset=${offset}`,
    );

    const pokemons = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const nro = segments[segments.length - 2];
      return {
        name,
        nro,
      };
    });

    await this.pokemonModel.insertMany(pokemons);

    return 'Seed exacuted successfully!!';
  }
}
