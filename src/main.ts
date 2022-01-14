import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const { port, host, version } = AppModule;
  const globalPrefix = `/api/${version}`;

  app.use(cors());
  app.setGlobalPrefix(globalPrefix)    
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.use(helmet());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    }),
  );
  
  await app.listen(port);
  const serverUrl = `Server listening on http://${host}:${port+globalPrefix}`;
  console.log(serverUrl);  
  app.use(csurf());
}
bootstrap();