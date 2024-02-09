import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { User } from "src/users/schema/user.schema";


@Schema()
export class Label{
    @ApiProperty()
    @Prop()
    title : string;

    @ApiProperty()
    @Prop()
    color:string;

    @ApiProperty()
    @Prop({type:Types.ObjectId,ref:'User'})
    user:User;
}

export const LabelSchema = SchemaFactory.createForClass(Label);