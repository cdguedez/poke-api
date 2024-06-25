import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(3)
  readonly name: string;
  @IsInt()
  @Min(1)
  @IsPositive()
  readonly nro: number;
}
