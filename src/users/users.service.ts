import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

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
      throw new HttpException("This user doesn't exist.", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.update(id, dto);

    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.delete(id);

    return user;
  }
}
