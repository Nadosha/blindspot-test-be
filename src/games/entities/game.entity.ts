import { ObjectType, Field, Int } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Album, AlbumSchema } from '../../albums/entities/album.entity';

@Schema()
@ObjectType()
export class Round {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => Boolean, { description: 'Indicates is round completed' })
  isCompleted: boolean;

  @Prop()
  @Field(() => Boolean, {
    description: 'Is answer correct or not ',
    nullable: true,
  })
  isCorrect: boolean;

  @Prop({ type: AlbumSchema, ref: 'Album' })
  @Field(() => Album, { description: 'Album that asked in current round ' })
  requestedAlbum: Album;

  @Prop({ type: [{ type: [AlbumSchema], ref: 'Round' }] })
  @Field(() => [Album], {
    description: 'Albums that proposed for user choice',
  })
  albums: [Album];
}

export const RoundSchema = SchemaFactory.createForClass(Round);

@Schema()
@ObjectType('Game')
export class Game {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => String, { description: 'User who initiate this Game' })
  user: string;

  @Prop()
  @Field(() => Boolean, { description: 'Indicates if game was completed' })
  isCompleted: boolean;

  @Prop()
  @Field(() => String, { description: 'User current stage' })
  currentRound: number;

  @Prop({ type: [{ type: RoundSchema }] })
  @Field(() => [Round], { description: 'List of rounds in Game' })
  rounds: Round[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
