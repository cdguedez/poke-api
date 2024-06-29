import { Controller, Get, Query } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  exec(@Query() paginationDto: PaginationDto) {
    return this.seedService.execSeeds(paginationDto);
  }
}
