// TODO:
//    -> pagination

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // configurations
  app.use(helmet());
  // app.use(csurf());
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port, () =>
    console.log(`App running on http://localhost:${port}`),
  );
}

bootstrap();
