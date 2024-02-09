import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(data: UserDto): Promise<User | object> {
    try {
      const user = await this.userModel.findOne({ email: data.email });
      if (!user) {
        const user = await this.userModel.create(data);
        return user;
      }
      return {
        status: 401,
        message: 'User already exists',
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          msg: 'creation failed',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          erreur: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(data: { email: string; password: string }) {
    try {
      const user: User = await this.userModel.findOne({ email: data.email });
      if (user) {
        let match = await user.matchPassword(data.password);
        if (match) {
          let token = await this.jwtService.signAsync(
            { id: user._id },
            { expiresIn: '60s', secret: process.env.SECRET_KEY },
          );
          console.log(token);
          return {
            token,
          };
        }else{
          throw new HttpException(
            {
              status: 401,
              message: 'Wrong password',
            },
            HttpStatus.UNAUTHORIZED,
          );
        }
      }
      throw new HttpException(
        {
          status: 401,
          message: 'Wrong email',
        },
        HttpStatus.UNAUTHORIZED,
      );
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          msg: 'login failed',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
