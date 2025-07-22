// src/auth/jwt.middleware.ts

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    const token = req.cookies['jwt'];  

    if (!token) {
      throw new UnauthorizedException('Authorization token missing');
    }

    try {
      const user = this.jwtService.verify(token);  
      req.user = user;  
      next(); 
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
