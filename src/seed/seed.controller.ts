import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  exec(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
  ) {
    const limitParams = limit ?? 10;
    const offsetParams = offset ?? 0;
    return this.seedService.execSeeds({
      limit: limitParams,
      offset: offsetParams,
    });
  }
}
