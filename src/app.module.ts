import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { ArtistsModule } from './artists/artists.module';
import { GamesModule } from './games/games.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, UsersModule, ArtistsModule, GamesModule],
})
export class AppModule {}
