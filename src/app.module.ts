import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artists/artists.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [UserModule, ArtistsModule, GamesModule],
})
export class AppModule {}
