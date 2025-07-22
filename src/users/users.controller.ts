import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminRoleGuard } from '../auth/admin-role.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from 'src/auth/roles.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Admin route to create a user
  @Post()
  @Roles(UserRole.ADMIN)  // Only admin can access this
  @UseGuards(AdminRoleGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Admin route to update user
  @Patch(':id')
  @Roles(UserRole.ADMIN)  // Only admin can access this
  @UseGuards(AdminRoleGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // Admin route to delete user
  @Delete(':id')
  @Roles(UserRole.ADMIN)  // Only admin can access this
  @UseGuards(AdminRoleGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // Normal route to get all users (no admin role required)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Normal route to get user by ID (no admin role required)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
