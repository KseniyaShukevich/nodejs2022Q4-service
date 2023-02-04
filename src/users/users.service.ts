import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { ERROR_MESSAGE } from 'src/errors/errors.message';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers() {
    const users = await this.userRepository.getAll();

    return users;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGE.USER_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const findedUser = await this.userRepository.findById(id);

    if (!findedUser) {
      throw new HttpException(
        ERROR_MESSAGE.USER_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    if (findedUser.password !== dto.oldPassword) {
      throw new HttpException(
        ERROR_MESSAGE.INVALID_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.userRepository.update(id, dto);

    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGE.USER_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
