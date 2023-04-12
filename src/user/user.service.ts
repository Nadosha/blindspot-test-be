import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { userName, password, gender } = createUserInput;
    const username = userName.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      userName: username,
      password: hashedPassword,
      score: 0,
      gender,
    });

    try {
      await newUser.save();

      return {
        msg: 'User successfully registered',
        userId: newUser._id,
        userName: newUser.userName,
        gender: newUser.gender,
        score: newUser.score,
      };
    } catch (e) {
      throw new Error('User Name is already registered');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async getUser(id: string) {
    const user = await this.userModel.findOne({ _id: id });

    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
