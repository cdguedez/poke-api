import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/pokeapi-response-api';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  private readonly URL: string = 'https://pokeapi.co/api/v2/pokemon';

  async execSeeds({ limit, offset }) {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>(
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
