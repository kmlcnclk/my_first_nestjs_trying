import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../../services/users/users.service';
import { SerializedUser } from '../../types/index';
import { UserNotFoundException } from '../../exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from '../../filters/HttpException.filter';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  @Get('/')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/username/:username')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserByUsername(@Param('username') username: string) {
    const user = this.usersService.getUserByUsername(username);

    if (!user) throw new BadRequestException('User not found');
    // throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return {
      status: true,
      user: new SerializedUser(user),
    };
  }

  @Get('/id/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  // @UseFilters(HttpExceptionFilter)
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);

    // if (!user) throw new BadRequestException('User not found', 'kal');
    if (!user)
      throw new UserNotFoundException({
        statusCode: 400,
        message: 'User not founad',
        error: 'Bad Request',
      });
    // if (!user) throw new UserNotFoundException('User not founad');
    // if (!user) throw new HttpException('User not founad', 402);

    return {
      status: true,
      user: new SerializedUser(user),
    };
  }

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
