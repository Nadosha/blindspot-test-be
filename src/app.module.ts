import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { GamesModule } from './games/games.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CommonModule, UsersModule, GamesModule, AuthModule],
})
export class AppModule {}
