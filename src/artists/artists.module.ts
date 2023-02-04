import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { AlbumModule } from 'src/albums/albums.module';
import { TrackModule } from 'src/tracks/tracks.module';
import { ArtistController } from './artists.controller';
import { ArtistRepository } from './artists.repository';
import { ArtistService } from './artists.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistService, ArtistRepository],
  imports: [forwardRef(() => TrackModule), forwardRef(() => AlbumModule)],
})
export class ArtistModule {}
