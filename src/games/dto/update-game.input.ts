import { CreateGameInput } from './create-game.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { User, UserSchema } from '../../user/entities/user.entity';
import { Round } from '../entities/game.entity';
import { Schema as MongooseSchema } from 'mongoose';
import { RoundInput } from './round.input';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, {
    description: 'User who initiate this Game',
    nullable: true,
  })
  user: string;

  @Field(() => Boolean, { description: 'Indicates if game was completed' })
  isCompleted: boolean;

  @Field(() => String, { description: 'User current stage', nullable: true })
  currentRound: number;

  @Field((type) => RoundInput)
  round: RoundInput;
}
