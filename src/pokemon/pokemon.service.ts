import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    const newPokemon: CreatePokemonDto = {
      ...createPokemonDto,
      name: createPokemonDto.name.toLowerCase(),
    };

    try {
      const pokemonDB = await this.pokemonModel.create(newPokemon);
      return pokemonDB;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon ya existe en DB ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(`No se pudo crear el Pokemon`);
    }
  }

  async findAll() {
    const allPokemon = await this.pokemonModel.find();
    return allPokemon;
  }

  async findOne(id: string) {
    let pokemon: Pokemon;
    if (!isNaN(+id)) {
      pokemon = await this.pokemonModel.findOne({ nro: id });
    }

    if (!pokemon && isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: id.toLowerCase().trim(),
      });
    }

    if (!pokemon) throw new NotFoundException('Pokemon no encontrado');

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return { id, updatePokemonDto };
  }

  remove(id: number) {
    return `id: ${id}`;
  }
}
