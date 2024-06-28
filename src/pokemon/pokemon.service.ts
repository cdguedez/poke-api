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

interface FindAllParams {
  limit: number;
  offset: number;
}

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async findAll({ limit, offset }: FindAllParams) {
    console.log(limit, offset);
    const allPokemon = await this.pokemonModel.find();
    return allPokemon;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ nro: term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon) throw new NotFoundException('Pokemon no encontrado');

    return pokemon;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    const newPokemon: CreatePokemonDto = {
      ...createPokemonDto,
      name: createPokemonDto.name.toLowerCase(),
    };

    try {
      const pokemonDB = await this.pokemonModel.create(newPokemon);
      return pokemonDB;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const pokemonDeleted = await this.pokemonModel.findOneAndDelete({
      _id: id,
    });
    if (!pokemonDeleted)
      throw new BadRequestException('Pokemon no Existe en DB.');

    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon ya existe en DB ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log({ error });
    throw new InternalServerErrorException(`No se pudo crear el Pokemon.`);
  }
}
