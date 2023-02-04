import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('/favs')
  getAll() {
    return this.favoritesService.getFavorites();
  }

  @Post('/favs/track/:id')
  addTrackToFavorites(@Param('id') id: string) {
    return this.favoritesService.addToFavorites('tracks', id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/favs/track/:id')
  deleteTrackFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteFromFavorites('tracks', id);
  }

  @Post('/favs/album/:id')
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoritesService.addToFavorites('albums', id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/favs/album/:id')
  deleteAlbumFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteFromFavorites('albums', id);
  }

  @Post('/favs/artist/:id')
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoritesService.addToFavorites('artists', id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/favs/artist/:id')
  deleteArtistFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteFromFavorites('artists', id);
  }
}
