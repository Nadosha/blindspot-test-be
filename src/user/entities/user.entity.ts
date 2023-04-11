import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  @Field(() => String, { description: 'User firstName ' })
  userName: string;

  @Prop()
  @Field(() => String, { description: 'User firstName ' })
  password: string;

  @Prop()
  @Field(() => String, { description: 'User gender ' })
  gender: string;
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
}

export const UserSchema = SchemaFactory.createForClass(User);
