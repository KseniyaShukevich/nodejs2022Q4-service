import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { ArtistModule } from 'src/artists/artists.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/tracks/tracks.module';
import { AlbumController } from './albums.controller';
import { AlbumRepository } from './albums.repository';
import { AlbumService } from './albums.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class AlbumModule {}
