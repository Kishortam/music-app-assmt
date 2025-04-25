import { Controller, Get, Post, Body, Query, Patch, Param } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly service: SongsService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() body: { title: string; artist: string; type: string }) {
    return this.service.create(body);
  }

  @Patch(':id/favorite')
  toggleFavorite(@Param('id') id: string) {
    return this.service.toggleFavorite(Number(id));
  }
}
