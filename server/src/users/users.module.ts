import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
