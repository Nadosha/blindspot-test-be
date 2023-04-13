import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<Album>,
  ) {}

  async create() {
    const artists = [
      'TOOL',
      'Ozzy+Osborne',
      'FKJ',
      'Phoenix',
      'Interpol',
      'MGMT',
      'Coldplay',
      'The+Kooks',
      'Beatles',
      'Nirvana',
      'Die+Antwoord',
      'Rolling+Stones',
      'Foo+Fighters',
      'Black+Sabbath',
      'Tame+Impala',
      'The+Smith',
      'Chevelle',
    ];
    const collectedData = [];

    for (const i of artists) {
      const res = await axios.get(
        `https://itunes.apple.com/search?term=${i}&media=music`,
      );

      const normalizeData = {
        albumID: res.data.results[0].collectionId,
        title: res.data.results[0].collectionName,
        artist: res.data.results[0].artistName,
        artistID: res.data.results[0].artistId,
        cover: res.data.results[0].artworkUrl100,
      };

      const newAlbum = new this.albumModel({
        ...normalizeData,
      });

      collectedData.push(newAlbum);
    }

    await this.albumModel.bulkSave(collectedData);
    return true;
  }

  findAll() {
    return `This action returns all albums`;
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }
}
