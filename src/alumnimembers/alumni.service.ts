import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alumni } from '../schemas/alumni.schema';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';

@Injectable()
export class AlumniService {
  constructor(@InjectModel(Alumni.name) private alumniModel: Model<Alumni>) {}

  async create(dto: CreateAlumniDto): Promise<Alumni> {
    return this.alumniModel.create(dto);
  }

  async findAllPaginated(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
  
    const [data, total] = await Promise.all([
      this.alumniModel.find().skip(skip).limit(limit).exec(),
      this.alumniModel.countDocuments(),
    ]);
  
    return {
      data,
      total,
      page,
      limit,
    };
  }
  
  async findAll(): Promise<Alumni[]> {
    return this.alumniModel.find();
  }

  async findOne(id: string): Promise<Alumni> {
    const alumni = await this.alumniModel.findById(id);
    if (!alumni) throw new NotFoundException(`Alumni not found`);
    return alumni;
  }

  async update(id: string, dto: UpdateAlumniDto): Promise<Alumni> {
    const updated = await this.alumniModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException(`Alumni not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const res = await this.alumniModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException(`Alumni not found`);
  }
}