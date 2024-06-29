import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { appConfiguration } from './config/app.config';
import { JoiSchemaValidation } from './config/joi-schema-validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiSchemaValidation,
      load: [appConfiguration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('INIT ENV', process.env);
  }
}
