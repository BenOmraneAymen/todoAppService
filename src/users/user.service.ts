import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findByid(id: string) {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async create(data: UserDto) {
    try {
      const user = await this.userModel.findOne({ email: data.email });
      if (!user) {
        const user = await this.userModel.create(data);
        return user;
      }
      return 'User already exists';
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: err,
      };
    }
  }

  async login(data: { email: string; password: string }) {
    try {
      const user: User = await this.userModel.findOne({ email: data.email });
      if (user) {
        let match = user.matchPassword(data.password);
        console.log(match);
        if (match) {
          return user;
        }
        return 'Wrong password';
      }
    } catch (err) {
      console.log(err);
      return {
        status:500,
        message:err
      };
    }
  }

  async update(id: string, data: UserDto) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, { $set: data });
      user.save();
      return user;
    } catch (err) {
      console.log(err);
      return {
        status:500,
        message:err
      };
    }
  }
}
