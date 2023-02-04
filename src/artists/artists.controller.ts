import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ArtistService } from './artists.service';
import { ArtistDto } from './dto/artist.dto';

@Controller('/api')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('/artist')
  getAll() {
    return this.artistService.getArtists();
  }

  @Get('/artist/:id')
  getById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @UsePipes(ValidationPipe)
  @Post('/artist')
  create(@Body() artistDto: ArtistDto) {
    return this.artistService.createArtist(artistDto);
  }

  @UsePipes(ValidationPipe)
  @Put('/artist/:id')
  update(@Param('id') id: string, @Body() artistDto: ArtistDto) {
    return this.artistService.updateArtist(id, artistDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/artist/:id')
  delete(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
