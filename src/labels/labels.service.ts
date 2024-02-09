import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { labelDto } from './dto/label.dto';
import { Label } from './schema/label.schema';

@Injectable()
export class LabelsService {
  constructor(
    @InjectModel(Label.name)
    private labelModel: mongoose.Model<Label>,
  ) {}

  async findAll(id: string): Promise<Label[]> {
    try {
      const labels = await this.labelModel.find({ user: id });
      return labels;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findById(id: string): Promise<Label> {
    try {
      const label = await this.labelModel.findById(id);
      return label;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async create(data: labelDto): Promise<Label> {
    try {
      const label = await this.labelModel.create(data);
      return label;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async put(id: string, data: labelDto): Promise<Label> {
    try {
      const newLabel = await this.labelModel.findByIdAndUpdate(id, {
        $set: data,
      });
      return newLabel;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async delete(id: string): Promise<Label> {
    try {
      const deletedLabel = await this.labelModel.findByIdAndDelete(id);
      return deletedLabel;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
