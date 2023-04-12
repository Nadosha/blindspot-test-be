import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAlbumInput {
  @Field(() => String, {
    description: 'Album ID - ID that comes from iTunes Provider',
  })
  albumID: string;

  @Field(() => String, { description: 'Title/Name of Album' })
  title: string;

  @Field(() => String, { description: 'Artist Name' })
  artist: string;

  @Field(() => String, {
    description: 'Artist ID - comes from iTunes provider',
  })
  artistID: string;

  @Field(() => String, { description: "URL of album's cover image" })
  cover: string;
}
