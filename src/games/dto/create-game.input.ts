import { InputType, Field } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Round } from '../entities/game.entity';

@InputType()
export class CreateGameInput {
  @Field(() => User, { description: 'User who initiate this Game' })
  user: User;

  @Field(() => Boolean, { description: 'Indicates if game was completed' })
  isCompleted: boolean;

  @Field(() => String, { description: 'User current stage' })
  currentRound: number;

  @Field(() => [Round], { description: 'List of rounds in Game' })
  rounds: [Round];
}
