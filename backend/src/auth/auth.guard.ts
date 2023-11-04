import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contant';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      response.statusCode = 403;
      response.send({
        status: 'error',
        message: 'Unauthorized access, no token provided',
        data: null,
        errors: null,
      });
      return false;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      (request as any)['user'] = payload?.user;
    } catch (err) {
      response.statusCode = 403;
      response.send({
        status: 'error',
        message: 'Unauthorized access, invalid access token',
        data: null,
        errors: null,
      });
      return false;
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (request?.headers as any)?.['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
