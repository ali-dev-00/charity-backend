import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class HobbiesDto {
    @ApiProperty({ example: true }) @IsBoolean() @IsOptional() contentWriting: boolean;
    @ApiProperty({ example: false }) @IsBoolean() @IsOptional() socialMedia: boolean;
    @ApiProperty({ example: true }) @IsBoolean() @IsOptional() fundRaising: boolean;
    @ApiProperty({ example: false }) @IsBoolean() @IsOptional() voiceOver: boolean;
    @ApiProperty({ example: true }) @IsBoolean() @IsOptional() teacherTraining: boolean;
    @ApiProperty({ example: 'Photography' }) @IsString() @IsOptional() otherHobby: string;
}

export class CreateVolunteerDto {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    profilePhoto: string;


    @ApiProperty({ example: 'not-orphan' })
    @IsEnum(['orphan', 'not-orphan'])
    orphanStatus: string;

    @ApiProperty({ example: 'City School Lahore' })
    @IsString() @IsNotEmpty() schoolName: string;

    @ApiProperty({ example: 'Matriculation' })
    @IsString() @IsNotEmpty() degreeCertificate: string;

    @ApiProperty({ example: '2018' })
    @IsString() @IsNotEmpty() passingYear: string;

    @ApiProperty({ example: 'Ali Khan' })
    @IsString() @IsNotEmpty() name: string;

    @ApiProperty({ example: 'Ahmed Khan' })
    @IsString() @IsNotEmpty() fatherName: string;

    @ApiProperty({ example: '03001234567' })
    @IsString() @IsNotEmpty() cell_no: string;

    @ApiProperty({ example: '03007654321' })
    @IsString() @IsNotEmpty() whatsappNo: string;

    @ApiProperty({ example: 'ali.khan@example.com' })
    @IsEmail() email: string;

    @ApiProperty({ example: 'Pakistan' })
    @IsString() @IsNotEmpty() Country: string;

    @ApiProperty({ example: 'Lahore' })
    @IsString() @IsNotEmpty() City: string;

    @ApiProperty({ example: 'Punjab' })
    @IsString() @IsNotEmpty() Province: string;

    @ApiProperty({ example: '2001-09-15' })
    @IsString() @IsNotEmpty() dateOfBirth: string;

    @ApiProperty({ example: 'single' })
    @IsString() @IsNotEmpty() maritalStatus: string;

    @ApiProperty({ example: 'male' })
    @IsString() @IsNotEmpty() gender: string;

    @ApiProperty({ example: 'House #12, Street 3, DHA Lahore' })
    @IsString() @IsNotEmpty() permanentAddress: string;

    @ApiProperty({ example: 'House #12, Street 3, DHA Lahore' })
    @IsString() @IsNotEmpty() mailingAddress: string;

    @ApiProperty({ example: 'University of Punjab' })
    @IsString() @IsOptional() institute: string;

    @ApiProperty({ example: 'Computer Science' })
    @IsString() @IsOptional() faculty: string;

    @ApiProperty({ example: 'BSCS' })
    @IsString() @IsOptional() degree: string;

    @ApiProperty({ example: 'Software Engineer' })
    @IsString() @IsOptional() designation: string;

    @ApiProperty({ example: 'Tech Solutions' })
    @IsString() @IsOptional() organization: string;

    @ApiProperty({ example: 'Lahore' })
    @IsString() @IsOptional() location: string;

    @ApiProperty({ type: HobbiesDto })
    @ValidateNested() @Type(() => HobbiesDto)
    hobbies: HobbiesDto;
}