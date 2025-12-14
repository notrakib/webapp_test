import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MurmurModule } from './murmur/murmur.module';
import { UserContextMiddleware } from './common/middleware/user-context.middleware';
import { MurmurController } from './murmur/murmur.controller';
import { UserController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    MurmurModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserContextMiddleware)
      .forRoutes(
        MurmurController,
        UserController,
      );
  }
}
