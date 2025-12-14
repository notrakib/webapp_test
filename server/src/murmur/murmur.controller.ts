import { Controller, Post, Delete, Get, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { MurmurService } from './murmur.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request } from 'express';
import { CreateMurmurDto } from './dto/create-murmur.dto';

@UseGuards(JwtAuthGuard)
@Controller('api')
export class MurmurController {
  constructor(private murmurService: MurmurService) {}

  @Post('me/murmurs')
  async create(@Req() req: Request, @Body() dto: CreateMurmurDto) {
    return this.murmurService.createMurmur(req['user'].id, dto);
  }

  @Delete('me/murmurs/:id')
  async delete(@Req() req: Request, @Param('id') id: number) {
    return this.murmurService.deleteMurmur(req['user'].id, id);
  }

  @Get('murmurs')
  async timeline(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.murmurService.getTimeline(req['user'].id, page || 1, limit || 10);
  }

  @Post('murmurs/:id/like')
  async like(@Req() req: Request, @Param('id') id: number) {
    return this.murmurService.likeMurmur(req['user'].id, id);
  }

  @Delete('murmurs/:id/like')
  async unlike(@Req() req: Request, @Param('id') id: number) {
    return this.murmurService.unlikeMurmur(req['user'].id, id);
  }
}
