import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Extract the token from the header

    if (!token) {
      return false; 
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token); 
      request.user = decoded; 
      return true; 
    } catch (error) {
      return false; 
    }
  }
}