import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';  
import { LoginDto } from '../users/dto/login.dto';  
import { ApiTags } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register user
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const response = await this.authService.register(createUserDto);

    // Set the JWT token as an HTTP-only cookie
    res.cookie('jwt', response?.data.access_token, {
      httpOnly: true,  // Make the cookie HTTP-only for security
      secure: process.env.NODE_ENV === 'production',  // Only send cookie over HTTPS in production
      maxAge: 3600000,  // Set expiration (1 hour for this example)
    });

    return res.status(HttpStatus.CREATED).json({
      status: true,
      message: 'Registration successful',
      data: response?.data.user,
    });
  }

  // Login user
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const response = await this.authService.login(loginDto);

    // Set the JWT token as an HTTP-only cookie
    res.cookie('jwt', response?.data.access_token, {
      httpOnly: true,  // Make the cookie HTTP-only for security
      secure: process.env.NODE_ENV === 'production',  // Only send cookie over HTTPS in production
      maxAge: 3600000,  // Set expiration (1 hour for this example)
    });

    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Login successful',
      data: response?.data.user,
    });
  }

  // Logout user
  @Post('logout')
  async logout(@Res() res: Response) {
    // Clear the JWT token from the HTTP-only cookie
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),  // Set expiration to the past to remove the cookie
    });

    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Successfully logged out',
    });
  }
}
