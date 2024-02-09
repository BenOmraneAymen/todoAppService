import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NoteSchema } from './entities/note.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:'Note',schema:NoteSchema}])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
