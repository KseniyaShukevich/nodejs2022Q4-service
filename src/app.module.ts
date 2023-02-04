import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { ArtistModule } from './artists/artists.module';
import { TrackModule } from './tracks/tracks.module';
import { IdMiddleware } from './middlewares/id.middleware';
import { UserController } from './users/users.controller';
import { ArtistController } from './artists/artists.controller';
import { TrackController } from './tracks/tracks.controller';

@Module({
  imports: [UserModule, ArtistModule, TrackModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IdMiddleware)
      .forRoutes(UserController, ArtistController, TrackController);
  }
}
