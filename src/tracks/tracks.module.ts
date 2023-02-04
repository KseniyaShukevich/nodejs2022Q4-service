import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { AlbumModule } from 'src/albums/albums.module';
import { ArtistModule } from 'src/artists/artists.module';
import { TrackController } from './tracks.controller';
import { TrackRepository } from './tracks.repository';
import { TrackService } from './tracks.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackService, TrackRepository],
  imports: [forwardRef(() => ArtistModule), forwardRef(() => AlbumModule)],
})
export class TrackModule {}
