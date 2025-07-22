import { Module } from '@nestjs/common';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Volunteer, VolunteerSchema } from '../schemas/volunteer.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Volunteer.name, schema: VolunteerSchema }]),
    CloudinaryModule, 
  ],
  controllers: [VolunteerController],
  providers: [VolunteerService],
})
export class VolunteerModule {}
