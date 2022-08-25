import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

// bu arkadaş aşağıdaki AuthenticatedGuard bu arkadaşın kullanılıabilmesi için logIn yapıyor bu sessionda geçerli ama jwt de geçerli mi bilmiyorum 
// örnek olarak profile route jwt ile korunuyorsa loginde de LocalAuthGuard varsa ben sigın yaparsam profilde AuthenticatedGuardbunu kullanabilir miyim?
// ya da AuthenticatedGuard unla jwtGuard aynı şeymi
// yani jwt de hem jwtauthguard hemde AuthenticatedGuard bu olmalı mı oksa jwt auth guard yetlimi video falan izle
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    console.log('====================================');
    console.log('====================================');
    console.log('====================================');
    console.log(result);
    console.log('====================================');
    console.log('====================================');
    console.log('====================================');
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest<Request>();
    console.log('====================================');
    console.log(req.isAuthenticated());
    console.log('====================================');
    return req.isAuthenticated();
  }
}
