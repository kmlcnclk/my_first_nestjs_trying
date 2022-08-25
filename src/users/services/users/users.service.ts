import { Injectable } from '@nestjs/common';
import { IUser } from '../../types';
import { SerializedUser } from '../../types/index';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private users: IUser[] = [
    {
      id: 1,
      username: 'anson',
      password: 'anson',
    },
    {
      id: 2,
      username: 'adem',
      password: 'adem',
    },
    {
      id: 3,
      username: 'mehmet',
      password: 'mehmet',
    },
  ];

  getUsers(): SerializedUser[] {
    // return this.users.map((user) => plainToClass(SerializedUser, user));
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string): IUser {
    return this.users.find((user) => user.username === username);
    // const user = this.users.find((user) => user.username === username);

    // return plainToClass(SerializedUser, user);
  }

  getUserById(id: number): IUser {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const password = encodePassword(createUserDto.password);
    console.log(password);

    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { username } });
  }

  findUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }
}
