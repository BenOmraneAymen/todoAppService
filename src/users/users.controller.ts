import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { User } from './schema/user.schema';
import { UsersService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly UsersService: UsersService,private readonly AuthService: AuthService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })

  @Get()
  findAll() {
    return this.UsersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.UsersService.findByid(id);
  }

  @Post()
  create(@Body() body: UserDto) {
    return this.AuthService.create(body);
  }
  @Post('/login')
  login(@Body() data:{email:string, password:string}) {
    return this.AuthService.login(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UserDto) {
    return this.UsersService.update(id, data);
  }
}
