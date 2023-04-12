import { ObjectType, Field, Int } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Album } from '../../albums/entities/album.entity';
import { User } from '../../user/entities/user.entity';

@Schema()
@ObjectType()
export class Game {
  @Field(() => Int)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'User who initiate this Game' })
  user: User;

  @Prop()
  @Field(() => Boolean, { description: 'Indicates if game was completed' })
  isCompleted: boolean;

  @Prop()
  @Field(() => String, { description: 'User current stage' })
  currentRound: number;

  @Prop({ type: [{ type: Round, ref: 'Round' }] })
  @Field(() => String, { description: 'List of rounds in Game' })
  rounds: [Round];
}

@ObjectType()
export class Round {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => Boolean, { description: 'Indicates is round completed' })
  isCompleted: boolean;

  @Prop()
  @Field(() => Boolean, { description: 'Is answer correct or not ' })
  isCorrect: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Album' })
  @Field(() => Album, { description: 'Album that asked in current round ' })
  requestedAlbum: Album;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Round' }] })
  @Field(() => [Album], {
    description: 'Albums that proposed for user choice',
  })
  albums: [Album];
}

export const GameSchema = SchemaFactory.createForClass(Game);
