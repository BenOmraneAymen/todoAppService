import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: mongoose.Model<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    try {
      const note = await this.noteModel.create(createNoteDto);
      return note;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findAll(id: string) {
    try {
      const notes = await this.noteModel.find({ collaborators: id });
      return notes;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findOne(id: string) {
    try {
      const note = await this.noteModel.findById(id)
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    try {
      const note = await this.noteModel.findByIdAndUpdate(id,{"$set":updateNoteDto})
      note.save()
      return updateNoteDto
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async remove(id: string) {
    try {
      const note = await this.noteModel.findByIdAndDelete(id)
      return 'note deleted'
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
