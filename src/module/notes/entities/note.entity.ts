import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
