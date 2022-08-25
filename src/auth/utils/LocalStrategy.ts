import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';

//bu arkadaş çağırıldığı modulün içinde olan routlara guard ekleyince çalışıyor
// username ve password e genellikle sadece loginde ihtiyaç duyulur bu yüzden bu auth modulünde
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    // super({usernameField:"email"});
    super();
  }

  async validate(username: string, password: string) {
    console.log(333331);
    // console.log(username);
    // console.log(password);

    const user = this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
