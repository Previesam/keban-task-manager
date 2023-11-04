import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contant';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: any) {
    return await this.jwtService.signAsync(user, {
      secret: jwtConstants.secret,
    });
  }
}
