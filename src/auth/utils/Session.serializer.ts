import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../../users/services/users/users.service';
import { UserEntity } from '../../typeorm/User.entity';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: UserEntity, done: (err, user: UserEntity) => void) {
    console.log('Ser');
    console.log('====================================');
    console.log(user);
    console.log('====================================');

    done(null, user);
  }

  async deserializeUser(
    user: UserEntity,
    done: (err, user: UserEntity) => void,
  ) {
    console.log('DeSer');
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    const userDB = await this.usersService.findUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
