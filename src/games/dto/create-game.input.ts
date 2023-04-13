import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field(() => String, { description: 'User who initiate this Game' })
  user: string;
}
