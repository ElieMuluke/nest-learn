// TODO:
//    -> routes naming,
//    -> password hashing,
//    -> pagination
//    -> refactor users and sessions

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port, () =>
    console.log(`App running on http://localhost:${port}`),
  );
}

bootstrap();
