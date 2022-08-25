import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './users/filters/HttpException.filter';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { SessionEntity } from './typeorm';
// import { getRepository, getConnection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const sessionRepository = getConnection().getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({});
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    session({
      name: 'NESTS_SESSION_ID',
      secret: 'coffeescript',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      // store: new TypeormStore({
      //   // cleanupLimit: 10,
      // }).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5000);
}
bootstrap();
