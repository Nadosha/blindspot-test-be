import { Injectable } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from '../albums/entities/album.entity';
import { Game, Round } from './entities/game.entity';
import { randChoice } from '../utils/getRandomeVal';
import { User } from '../user/entities/user.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<Album>,

    @InjectModel(Game.name)
    private readonly gameModel: Model<Game>,

    @InjectModel(Round.name)
    private readonly roundModel: Model<Round>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createGameInput: CreateGameInput) {
    const rounds = [];

    for (let i = 1; i <= 5; i++) {
      const getAlbums = await this.albumModel
        .find()
        .limit(8)
        .skip(Math.floor(Math.random() * 16));

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

  async findCurrentGame(user: MongooseSchema.Types.ObjectId) {
    const currentGame = await this.gameModel.findOne({
      user: user,
      isCompleted: false,
    });

    return currentGame;
  }

  async update(
    _id: MongooseSchema.Types.ObjectId,
    updateGameInput: UpdateGameInput,
  ) {
    const game = await this.gameModel.findOne({
      _id: _id,
      isCompleted: false,
    });

    const currentRound = game?.rounds[game.currentRound - 1];

    try {
      await this.gameModel.updateOne(
        {
          _id: updateGameInput._id,
          'rounds._id': updateGameInput.round._id,
        },
        {
          $inc: {
            currentRound: 1,
          },
          isCompleted: game.currentRound >= 5,
          $set: {
            'rounds.$': {
              isCompleted: updateGameInput.round.isCompleted,
              isCorrect: updateGameInput.round.isCorrect,
              ...currentRound,
            },
          },
        },
      );
    } catch (e) {
      throw new Error(`Failed to update Game ${e}`);
    }

    try {
      await this.gameModel.updateOne(
        {
          _id: updateGameInput._id,
          $and: [
            {
              rounds: {
                $not: {
                  $elemMatch: { isCompleted: false },
                },
              },
            },
          ],
        },
        {
          $set: {
            isCompleted: true,
          },
        },
      );

      if (updateGameInput.round.isCorrect) {
        this.userModel.updateOne({
          _id: game.user,
          $inc: {
            score: 5,
          },
        });
      }
    } catch (e) {
      throw new Error(`Failed to update Game ${e}`);
    }
    return true;
  }
}
