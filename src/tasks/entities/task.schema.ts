import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Label } from 'src/labels/schema/label.schema';
import { User } from 'src/users/schema/user.schema';

@Schema()
export class Task {
  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop()
  status: string;

  @ApiProperty()
  @Prop()
  importance: string;

  @ApiProperty()
  @Prop()
  endDate: Date;

  @ApiProperty()
  @Prop()
  files: string[];

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User' })
  colaborators: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Label' })
  label: Types.ObjectId;
}

export const taskSchema = SchemaFactory.createForClass(Task);
