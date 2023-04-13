import { Injectable } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from '../albums/entities/album.entity';
import { Game, Round } from './entities/game.entity';
import { randChoice } from '../utils/getRandomeVal';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<Album>,

    @InjectModel(Game.name)
    private readonly gameModel: Model<Game>,

    @InjectModel(Round.name)
    private readonly roundModel: Model<Round>,
  ) {}

  async create(createGameInput: CreateGameInput) {
    const rounds = [];
    for (let i = 1; i <= 2; i++) {
      const getAlbums = await this.albumModel
        .find()
        .limit(8)
        .skip(Math.floor(Math.random() * 17));

      const requestedAlbum = randChoice(getAlbums);

      const round = new this.roundModel({
        isCompleted: false,
        isCorrect: null,
        requestedAlbum: requestedAlbum,
        albums: getAlbums,
      });

      rounds.push(round);
    }

    const newGame = new this.gameModel({
      user: createGameInput.user,
      isCompleted: false,
      currentRound: 1,
      rounds: rounds,
    });

    try {
      await newGame.save();
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  findAll() {
    return `This action returns all games`;
  }

  findCurrentGame(user: MongooseSchema.Types.ObjectId) {
    const currentGame = this.gameModel.findOne({
      user: user,
      isCompleted: false,
    });

    return currentGame;
  }

  async update(
    _id: MongooseSchema.Types.ObjectId,
    updateGameInput: UpdateGameInput,
  ) {
    try {
      await this.gameModel.updateOne(
        {
          _id: updateGameInput._id,
          'rounds._id': updateGameInput.round._id,
        },
        {
          $set: {
            'rounds.$': {
              isCompleted: updateGameInput.round.isCompleted,
              isCorrect: updateGameInput.round.isCorrect,
            },
          },
        },
      );
    } catch (e) {
      throw new Error(`Failed to update Game ${e}`);
    }

    try {
      const up = await this.gameModel.updateOne(
        {
          'rounds.isCompleted': { $all: [true] },
          _id: updateGameInput._id,
        },
        {
          $set: {
            isCompleted: true,
          },
        },
      );
    } catch (e) {
      throw new Error(`Failed to update Game ${e}`);
    }
    return true;
  }
}
