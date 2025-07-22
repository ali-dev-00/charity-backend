import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VolunteerService } from './volunteer.service';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { UploadService } from '../cloudinary/upload.service';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';


@ApiTags('volunteer')
@Controller('api/volunteer')
export class VolunteerController {
  constructor(
    private readonly service: VolunteerService,
    private readonly uploadService: UploadService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('profilePhoto'))
  @ApiOperation({ summary: 'Create a new volunteer with profile photo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateVolunteerDto })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    // Upload profile image to Cloudinary
    const uploaded = await this.uploadService.uploadImage(file);
    body.profilePhoto = uploaded.secure_url;

    // Parse hobbies JSON string if sent as text
    if (typeof body.hobbies === 'string') {
      try {
        body.hobbies = JSON.parse(body.hobbies);
      } catch {
        throw new Error('Invalid JSON in hobbies');
      }
    }

    const data = await this.service.create(body);
    return {
      status: true,
      message: 'Volunteer created successfully',
      data,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all volunteers (paginated)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAllPaginated(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const data = await this.service.findAllPaginated(+page || 1, +limit || 10);
    return {
      status: true,
      message: 'Volunteers fetched successfully',
      items: data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a volunteer by ID' })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return {
      status: true,
      message: 'Volunteer fetched successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update volunteer by ID' })
  @UseInterceptors(FileInterceptor('profilePhoto')) // Handling file uploads
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVolunteerDto,
    @UploadedFile() file: Express.Multer.File, // If a new file is provided, handle it
  ) {
    // If there's a file, upload it to cloud storage
    if (file) {
      const uploaded = await this.uploadService.uploadImage(file);
      dto.profilePhoto = uploaded.secure_url; // Update the profilePhoto URL
    }

    // Parse and handle the hobbies field if it's a string
    if (typeof dto.hobbies === 'string') {
      try {
        dto.hobbies = JSON.parse(dto.hobbies);
      } catch (e) {
        throw new Error('Invalid JSON format in hobbies');
      }
    }

    const updated = await this.service.update(id, dto);

    return {
      status: true,
      message: 'Volunteer updated successfully',
      data: updated,
    };
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete volunteer by ID' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return {
      status: true,
      message: 'Volunteer deleted',
    };
  }
}
