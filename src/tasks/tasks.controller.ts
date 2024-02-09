import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.schema';

@ApiTags('Task')
@Controller('task')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Task,
  })

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }



  @Get('collab=:id')
  findAll(@Param('id') id: string) {
    return this.taskService.findAll(id);
  }

  @Get('task=:id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
