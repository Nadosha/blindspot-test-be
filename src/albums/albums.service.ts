import { Injectable } from '@nestjs/common';
import { CreateAlbumInput } from './dto/create-album.input';

@Injectable()
export class AlbumsService {
  create(createAlbumInput: CreateAlbumInput) {
    return 'This action adds a new album';
  }

  findAll() {
    return `This action returns all albums`;
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }
}
