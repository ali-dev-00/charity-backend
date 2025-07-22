import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Volunteer extends Document {
  @Prop({ required: true })
  profilePhoto: string;

  @Prop({ required: true })
  schoolName: string;

  @Prop({ required: true })
  degreeCertificate: string;

  @Prop({ required: true })
  passingYear: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  fatherName: string;

  @Prop({ required: true })
  cell_no: string;

  @Prop({ required: true })
  whatsappNo: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  Country: string;

  @Prop({ required: true })
  City: string;

  @Prop({ required: true })
  Province: string;

  @Prop({ required: true })
  dateOfBirth: string;

  @Prop({ required: true })
  maritalStatus: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  permanentAddress: string;

  @Prop({ required: true })
  mailingAddress: string;

  @Prop() institute: string;
  @Prop() faculty: string;
  @Prop() degree: string;
  @Prop() designation: string;
  @Prop() organization: string;
  @Prop() location: string;

  @Prop({
    type: {
      contentWriting: Boolean,
      socialMedia: Boolean,
      fundRaising: Boolean,
      voiceOver: Boolean,
      teacherTraining: Boolean,
      otherHobby: String,
    },
    default: {},
  })
  hobbies: {
    contentWriting: boolean;
    socialMedia: boolean;
    fundRaising: boolean;
    voiceOver: boolean;
    teacherTraining: boolean;
    otherHobby: string;
  };
}

export const VolunteerSchema = SchemaFactory.createForClass(Volunteer);
