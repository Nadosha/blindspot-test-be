import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User userName ' })
  userName: string;

  @Field(() => String, { description: 'User Password ' })
  password: string;

  @Field(() => String, { description: 'User Gender ' })
  gender: string;

  @Field(() => Number, { description: 'How much point user earn in total ', nullable: true })
  score: number;
}
