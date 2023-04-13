import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType('User')
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'User firstName ' })
  userName: string;

  @Prop()
  @Field(() => String, { description: 'User firstName ' })
  password: string;

  @Prop()
  @Field(() => String, { description: 'User gender ' })
  gender: string;

  @Prop()
  @Field(() => Number, {
    description: 'How much point user earn in total ',
    defaultValue: 1,
  })
  score: number;
}

@ObjectType()
export class CreateUserOutput {
  @Field(() => String, { description: 'Result message ' })
  msg: string;

  @Field(() => String, { description: 'ID of user that have been created ' })
  userId: string;

  @Field(() => String, {
    description: 'User Name of user that have been created ',
  })
  userName: string;

  @Field(() => String, {
    description: 'User Gender of user that have been created ',
  })
  gender: string;

  @Field(() => Number, { description: 'How much point user earn in total ' })
  score: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
