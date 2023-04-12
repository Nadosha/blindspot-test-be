import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class Album {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, {
    description: 'Album ID - ID that comes from iTunes Provider',
  })
  albumID: string;

  @Prop()
  @Field(() => String, { description: 'Title/Name of Album' })
  title: string;

  @Prop()
  @Field(() => String, { description: 'Artist Name' })
  artist: string;

  @Prop()
  @Field(() => String, {
    description: 'Artist ID - comes from iTunes provider',
  })
  artistID: string;

  @Prop()
  @Field(() => String, { description: "URL of album's cover image" })
  cover: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
