import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/utils/LocalGuard';
import { AuthenticatedGuard } from '../../utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @Post('login')
  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {}

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}
