import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Note {
  @Prop({ required: true })
  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  note: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
