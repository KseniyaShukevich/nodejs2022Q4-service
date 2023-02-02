import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { IdMiddleware } from './middlewares/id.middleware';
import { UserController } from './users/users.controller';

@Module({
  imports: [UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdMiddleware).forRoutes(UserController);
  }
}
