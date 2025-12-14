import { Controller, Post, Delete, Req, Param, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request } from 'express';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post(':id/follow')
  async follow(@Req() req: Request, @Param('id') followingId: number) {
    return this.userService.followUser(req['user'].id, Number(followingId));
  }

  @Get()
  async getAllUsers(@Req() req: Request) {
    return this.userService.findAll(req['user'].id);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Delete(':id/follow')
  async unfollow(@Req() req: Request, @Param('id') followingId: number) {
    return this.userService.unfollowUser(req['user'].id, Number(followingId));
  }

  @Get(':id/is-followed')
  async isFollowed(@Req() req: Request, @Param('id') userId: number) {
    return this.userService.isUserFollowed(req['user'].id, Number(userId));
  }
}
