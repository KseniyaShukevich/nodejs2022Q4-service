import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { AlbumModule } from 'src/albums/albums.module';
import { ArtistModule } from 'src/artists/artists.module';
import { TrackModule } from 'src/tracks/tracks.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  exports: [FavoritesService],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
})
export class FavoritesModule {}
