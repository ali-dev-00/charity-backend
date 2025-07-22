import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Ali Updated' }) name?: string;
  @ApiProperty({ example: 'updated@example.com' }) email?: string;
  @ApiProperty({ example: 'Updated Org' }) organization?: string;
}
