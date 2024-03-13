import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import * as mongoose from 'mongoose';
import { Note } from './entities/note.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: mongoose.Model<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    try {
      let { heading, note } = createNoteDto;
      console.log(createNoteDto);

      if (!heading || !note) {
        return new BadRequestException('Requires both heading and note');
      }

      const createNote = await this.noteModel.create(createNoteDto);

      if (!createNote) {
        return new RequestTimeoutException(
          'Error while creating note in server',
        );
      }
      return createNote;
    } catch (error) {
      return new RequestTimeoutException('Error while creating note in server');
    }
  }

  async findAll() {
    try {
      const notes = await this.noteModel.find();
      if (!notes) {
        return new RequestTimeoutException(
          'Error while creating fetching from server',
        );
      }

      return notes;
    } catch (error) {
      return new RequestTimeoutException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const notes = await this.noteModel.find({ userId: id });
      if (!notes) {
        return new BadRequestException('Please check the provided id');
      }
      return notes;
    } catch (error) {}
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    try {
      if (!updateNoteDto)
        return new BadRequestException('Requies updated heading or notes');

      const updatedNote = await this.noteModel.updateOne(
        { _id: id },
        updateNoteDto,
        { new: true },
      );

      if (!updatedNote) {
        return new BadRequestException('Unable to update the praticular note');
      }
      return updatedNote;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const deletednote = await this.noteModel.deleteOne({ _id: id });
      return true;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
