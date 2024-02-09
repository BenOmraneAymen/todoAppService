import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Note } from './entities/note.schema';

@ApiTags('Note')
@Controller('note')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Note,
  })
  
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get('collab=:id')
  findAll(@Param('id') id: string) {
    return this.noteService.findAll(id);
  }

  @Get('note=:id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(id);
  }

  @Patch('note=:id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }

  @Delete('note=:id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
