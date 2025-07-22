import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Volunteer } from '../schemas/volunteer.schema';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';

@Injectable()
export class VolunteerService {
  constructor(@InjectModel(Volunteer.name) private readonly model: Model<Volunteer>) {}

  async create(dto: CreateVolunteerDto): Promise<Volunteer> {
    return this.model.create(dto);
  }

  async findAllPaginated(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.find().skip(skip).limit(limit),
      this.model.countDocuments(),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Volunteer> {
    const found = await this.model.findById(id);
    if (!found) throw new NotFoundException('Volunteer not found');
    return found;
  }

  async update(id: string, dto: UpdateVolunteerDto): Promise<Volunteer> {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Volunteer not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Volunteer not found');
  }
}
