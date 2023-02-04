import { v4 as uuidv4 } from 'uuid';

import InMemoryStorage from '../database/InMemoryStorage';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserRepository {
  private database: InMemoryStorage<User>;

  constructor() {
    this.database = new InMemoryStorage();
  }

  public async create(userDto: CreateUserDto): Promise<User> {
    const user = new User(
      uuidv4(),
      userDto.login,
      userDto.password,
      1,
      Date.now(),
      Date.now(),
    );

    await this.database.add(user);

    return user;
  }

  public async getAll(): Promise<User[]> {
    const users = await this.database.getAll();

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.database.findBy('id', id);

    return user;
  }

  public async update(
    id: string,
    userDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const findedUser = await this.database.findBy('id', id);

    if (!findedUser) {
      return undefined;
    }

    const userUpdated = new User(
      id,
      findedUser.login,
      userDto.newPassword,
      findedUser.version + 1,
      findedUser.createdAt,
      Date.now(),
    );

    const user = await this.database.update('id', id, userUpdated);

    return user;
  }

  public async delete(id: string): Promise<User | undefined> {
    const user = await this.database.remove('id', id);

    return user;
  }
}
