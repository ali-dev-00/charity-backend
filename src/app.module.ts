import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AlumniModule } from './alumni-registration/alumni.module';
import { AuthModule } from './auth/auth.module';
import { VolunteerModule } from './volunteer-registration/volunteer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: process.env.MONGODB_URI ?? 'mongodb+srv://mirzaaly8:cT3XaKS3nptL4g9C@cluster0.ygwcfzu.mongodb.net/',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    AlumniModule,
    VolunteerModule
  ],
})
export class AppModule {}
