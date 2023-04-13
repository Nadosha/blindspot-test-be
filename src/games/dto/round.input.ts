import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { Album, AlbumSchema } from '../../albums/entities/album.entity';
import { CreateAlbumInput } from '../../albums/dto/create-album.input';

@InputType()
export class RoundInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => Boolean, { description: 'Indicates is round completed' })
  isCompleted: boolean;

  @Prop()
  @Field(() => Boolean, { description: 'Is answer correct or not ' })
  isCorrect: boolean;

  @Prop({ type: AlbumSchema, ref: 'Album' })
  @Field(() => CreateAlbumInput, {
    description: 'Album that asked in current round ',
    nullable: true,
  })
  requestedAlbum: CreateAlbumInput;

  @Prop({ type: [{ type: [AlbumSchema], ref: 'Round' }] })
  @Field(() => [CreateAlbumInput], {
    description: 'Albums that proposed for user choice',
    nullable: true,
  })
  albums: [CreateAlbumInput];
}
