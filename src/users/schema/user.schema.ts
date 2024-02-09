import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
const bcrypt = require('bcrypt');

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export enum Status {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  BANNED = 'banned',
}

@Schema({
  timestamps: true,
})
export class User {

  @Prop({
    required: true,
  })
  _id: string;
  
  @ApiProperty()
  @Prop({
    required: true,
  })
  username: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  email: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  password: string;

  @ApiProperty()
  @Prop()
  role: Role;

  @ApiProperty()
  @Prop()
  status: Status;

  
  matchPassword:Function
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: any) {
  try {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log(err);
  }
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
   return await bcrypt.compare(enteredPassword, this.password);
 };

UserSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate() as { $set: { password: string } };
    const { $set } = update;
  
    if ($set && $set.password) {
      try {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash($set.password, saltRounds);
  
        $set.password = hashedPassword;
  
        return next();
      } catch (err) {
        return next(err);
      }
    }
  
    return next();
  });
  