import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { ERROR_MESSAGE } from 'src/errors/errors.message';
import { getUserResponseFormat } from './response/users-response.formatter';
import { UserResponse } from './response/users-response.interface';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.getAll();
    const formattedUsers = users.map((user) => getUserResponseFormat(user));

    return formattedUsers;
  }

  async getUserById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGE.USER_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    return getUserResponseFormat(user);
  }

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const user = await this.userRepository.create(dto);

    return getUserResponseFormat(user);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<UserResponse> {
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

    return getUserResponseFormat(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGE.USER_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
