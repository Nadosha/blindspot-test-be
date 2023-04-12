import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsResolver } from './albums.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './entities/album.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Album.name,
        schema: AlbumSchema,
      },
    ]),
  ],
  exports: [AlbumsService],
  providers: [AlbumsResolver, AlbumsService],
})
export class AlbumsModule {}
