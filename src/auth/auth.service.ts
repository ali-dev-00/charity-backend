import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    // Register user
    async register(createUserDto: CreateUserDto) {
        try {
            const { email, password, role = 'donor' } = createUserDto;

            // Check if the user already exists
            const userExists = await this.usersService.findByEmail(email);
            if (userExists) {
                throw new ConflictException('User already exists with this email');
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = await this.usersService.create({
                ...createUserDto,
                password: hashedPassword,
                role,
            });

            // Create JWT payload
            const payload: JwtPayload = { sub: String(newUser._id), username: newUser.name, role: newUser.role };

            return {
                status: true,
                message: 'Registration successful',
                data: {
                    access_token: this.jwtService.sign(payload),  // JWT Token
                    user: {
                        id: newUser._id,
                        username: newUser.name,
                        email: newUser.email,
                        role: newUser.role,
                    },
                },
            };
        } catch (error) {
            console.error('Error comparing passwords:', error);
        }
    }

    // Login user
    async login(loginDto: LoginDto) {
        try {
            const { email, password } = loginDto;

            const user = await this.usersService.findByEmail(email);
            console.log('user', user)
            if (!user) {
                throw new UnauthorizedException('Invalid email or password');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password comparison result:', isPasswordValid);


            const payload: JwtPayload = { sub: String(user._id), username: user.name, role: user.role };
            const access_token = this.jwtService.sign(payload);

            return {
                status: true,
                message: 'Login successful',
                data: {
                    access_token,
                    user: {
                        id: user._id,
                        username: user.name,
                        email: user.email,
                        role: user.role,
                    },
                },
            };
        } catch (error) {
            console.error('Error comparing passwords:', error);
        }
    }
}
