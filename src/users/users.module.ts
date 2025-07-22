
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; 
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../schemas/user.schema'; 
import { AdminRoleGuard } from '../auth/admin-role.guard';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // Add the JWT secret from environment variables
      signOptions: { expiresIn: '60m' }, // Set the expiration for JWT
    }),
  ],
  providers: [UsersService, AdminRoleGuard],  // Register the guard here
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
