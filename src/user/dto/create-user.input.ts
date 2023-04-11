import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User userName ' })
  userName: string;

  @Field(() => String, { description: 'User Password ', nullable: false })
  password: string;

  @Field(() => String, { description: 'User Gender ' })
  gender: string;
}
