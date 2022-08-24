import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

export enum Roles {
  Admin = 'Admin',
  Basic = 'Basic',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'Admin create projects & tasks, Basic create tasks',
});

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field()
  @Prop()
  firstName: string;

  @Field()
  @Prop()
  lastName: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Prop()
  imageURL?: string;

  @Field(() => Roles, { defaultValue: Roles.Admin, nullable: true })
  @Prop()
  role?: Roles;

  @Field()
  @Prop()
  createdAt: string = new Date().toISOString();
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
