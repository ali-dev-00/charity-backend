import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlumniController } from './alumni.controller';
import { AlumniService } from './alumni.service';
import { Alumni, AlumniSchema } from '../schemas/alumni.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Alumni.name, schema: AlumniSchema }]),
  ],
  controllers: [AlumniController],
  providers: [AlumniService],
})
export class AlumniModule {}