import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      let { fullName, email, password, number } = createUserDto;

      if (!fullName || !email || !password || !number) {
        return new BadRequestException('Requires all the fileds');
      }

      let salt = bcrypt.genSaltSync(10);
      let hash = await bcrypt.hash(createUserDto.password, salt);
      console.log(hash);

      const createdUser = await this.userModel.create({
        fullName,
        email,
        password: hash,
        number,
      });

      if (!createdUser) {
        return new RequestTimeoutException(
          'Error while creating note in server',
        );
      }

      return createdUser;
    } catch (error) {
      return new RequestTimeoutException('Error while creating note in server');
    }
  }

  async login(loginUserDto: UpdateUserDto) {
    try {
      let { email, password } = loginUserDto;

      if (!email || !password) {
        return new BadRequestException('Requires all the fileds');
      }

      const user = await this.userModel.find({ email: loginUserDto.email });

      if (!user[0]) {
        return new RequestTimeoutException(
          'Error while creating note in server',
        );
      }

      let isPasswordCorrect = await bcrypt.compare(
        loginUserDto.password,
        user[0].password,
      );

      if (!isPasswordCorrect) {
        throw new BadRequestException('Incorrect email or password');
      }

      return user;
    } catch (error) {
      return new RequestTimeoutException('Error while creating note in server');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
