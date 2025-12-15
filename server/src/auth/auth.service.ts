import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AppConflictException } from 'src/common/exceptions/conflict.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(username: string, password: string) {
    const existing = await this.usersService.findByUsername(username);
    if (existing) throw new AppConflictException('User already exists');
    await this.usersService.createUser(username, password);
    return { message: 'User created' };
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload), id:user.id };
  }
}
