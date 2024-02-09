import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskModel.create(createTaskDto);
      return task;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findAll(id:string) {
    try {
      const tasks = await this.taskModel.find({$or:[{user:id},{colaborators:id}]});
      console.log(tasks);
      return tasks;
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.taskModel.findById(id);
      return task;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskModel.findByIdAndUpdate(id,updateTaskDto);
      return task;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async remove(id: string) {
    try {
      const task = await this.taskModel.findByIdAndDelete(id)
      return 'task deleted'
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
