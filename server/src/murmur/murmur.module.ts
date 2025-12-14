import { Module } from '@nestjs/common';
import { MurmurService } from './murmur.service';
import { MurmurController } from './murmur.controller';

@Module({
  imports: [],
  providers: [MurmurService],
  controllers: [MurmurController],
})
export class MurmurModule {}
