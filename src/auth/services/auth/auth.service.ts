import {
  Injectable,
  Inject,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.usersService.findUserByUsername(username);
    console.log(2);

    // if (userDB && userDB.password === password) {
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        console.log(userDB);
        return userDB;
      }
      throw new UnauthorizedException('Your password is wrong!');
    }
    console.log('3 my failded');

    throw new NotFoundException('User was not found!');
  }
}
