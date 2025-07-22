import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  import { AlumniService } from './alumni.service';
  import { CreateAlumniDto } from './dto/create-alumni.dto';
  import { UpdateAlumniDto } from './dto/update-alumni.dto';
  import { ApiTags, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('alumni')
  @Controller('api/alumni')
  export class AlumniController {
    constructor(private readonly service: AlumniService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new alumni entry' })
    @ApiResponse({ status: 201, description: 'Alumni created successfully' })
    async create(@Body() dto: CreateAlumniDto) {
      const data = await this.service.create(dto);
      return {
        status: true,
        message: 'Alumni created successfully',
        data,
      };
    }
  
    @Get()
    @ApiOperation({ summary: 'Get paginated list of alumni' })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    async findAllPaginated(
      @Query('page') page: string,
      @Query('limit') limit: string,
    ) {
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;
  
      const data = await this.service.findAllPaginated(pageNumber, limitNumber);
      return {
        status: true,
        message: 'Alumni list fetched successfully',
        items : data,
      };
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a single alumni by ID' })
    async findOne(@Param('id') id: string) {
      const data = await this.service.findOne(id);
      return {
        status: true,
        message: 'Alumni fetched successfully',
        data,
      };
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update an alumni record by ID' })
    async update(@Param('id') id: string, @Body() dto: UpdateAlumniDto) {
      const data = await this.service.update(id, dto);
      return {
        status: true,
        message: 'Alumni updated successfully',
        data,
      };
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an alumni record by ID' })
    async remove(@Param('id') id: string) {
      await this.service.remove(id);
      return {
        status: true,
        message: 'Alumni deleted successfully',
      };
    }
  }
  