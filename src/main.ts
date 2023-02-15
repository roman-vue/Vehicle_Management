import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './settings/filter';
import {
  LoggingInterceptor,
  TimeoutInterceptor,
} from './settings/interceptors';
import { SwaggerConfig } from './settings/swagger';
import * as basicAuth from 'express-basic-auth';
import { ResponseInterceptor } from './settings/interceptors/response';

async function bootstrap() {
  const configService = new ConfigService();

  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  app.useGlobalFilters(new AllExceptionFilter(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api/v1/cirugia/');
  app.use(
    '/api/v1/cirugia/docs',
    basicAuth({
      challenge: true,
      users: { user: configService.get<string>('SWAGGER_PASS') },
    }),
  );
  SwaggerConfig.ConfigSwaggerModule(app);
  let port = 3000;
  await app.listen(port, () => {
    Logger.log('APP', `Cirugia is running on http://localhost:${port}`);
    Logger.debug(
      'APP',
      `Swagger is running on http://localhost:${port}/api/v1/infinitum/docs`,
    );
  });
}
bootstrap();
