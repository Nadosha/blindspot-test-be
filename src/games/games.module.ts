import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema, Round, RoundSchema } from './entities/game.entity';
import { Album, AlbumSchema } from '../albums/entities/album.entity';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
      },
      {
        name: Album.name,
        schema: AlbumSchema,
      },
      {
        name: Round.name,
        schema: RoundSchema,
      },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [GamesService],
  providers: [GamesResolver, GamesService],
})
export class GamesModule {}
