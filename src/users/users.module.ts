import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserController } from './users.controller';
import { UsersService } from './user.service';
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service';

@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema}]),
  JwtModule.register({
    global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [UserController],
  providers: [UsersService,AuthService]
})
export class UsersModule {}
