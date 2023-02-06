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
import { AlbumService } from './albums.service';
import { AlbumDto } from './dto/album.dto';

@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('/album')
  getAll() {
    return this.albumService.getAlbums();
  }

  @Get('/album/:id')
  getById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @UsePipes(ValidationPipe)
  @Post('/album')
  create(@Body() albumDto: AlbumDto) {
    return this.albumService.createAlbum(albumDto);
  }

  @UsePipes(ValidationPipe)
  @Put('/album/:id')
  update(@Param('id') id: string, @Body() albumDto: AlbumDto) {
    return this.albumService.updateAlbum(id, albumDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/album/:id')
  delete(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
