import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  getAll() {
    return this.userService.getUsers();
  }

  @Get('/user/:id')
  getById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UsePipes(ValidationPipe)
  @Post('/user')
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @UsePipes(ValidationPipe)
  @Put('/user/:id')
  update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(id, userDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/user/:id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
