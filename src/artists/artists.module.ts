import { Module } from '@nestjs/common';
import { ArtistController } from './artists.controller';
import { ArtistRepository } from './artists.repository';
import { ArtistService } from './artists.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
})
export class ArtistModule {}
