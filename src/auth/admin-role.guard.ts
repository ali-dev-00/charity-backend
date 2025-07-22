import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserRole } from './roles.enum';  
import { ROLES_KEY } from './roles.decorator';  

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, 
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required roles metadata from the handler
    const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
    
    if (!requiredRoles) {
      return true;  
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];  

    if (!token) {
      throw new ForbiddenException('Authorization token missing');
    }

    try {

      const user = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      request.user = user;  


      if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Access denied');
      }

      return true;  
    } catch (error) {
      console.log('invalid token from admin role guard')
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
