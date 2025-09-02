import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Author extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
