import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Label } from "src/labels/schema/label.schema";
import { User } from "src/users/schema/user.schema";


@Schema()
export class Note {
    @ApiProperty()
    @Prop()
    title:string

    @ApiProperty()
    @Prop()
    content:string

    @ApiProperty()
    @Prop({type:Types.ObjectId,ref:'User'})
    collaborators:User[]

    @ApiProperty()
    @Prop({type:Types.ObjectId,ref:'Label'})
    label:Label
}

export const NoteSchema = SchemaFactory.createForClass(Note);
