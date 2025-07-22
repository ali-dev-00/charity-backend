import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumniDto } from './create-alumni.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlumniDto extends PartialType(CreateAlumniDto) {
  @ApiProperty({ example: 'Ali Updated' }) name?: string;
  @ApiProperty({ example: 'updated@example.com' }) email?: string;
  @ApiProperty({ example: 'Updated Org' }) organization?: string;
}
