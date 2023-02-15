import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static ConfigSwaggerModule(app: INestApplication): void {
    const configService = new ConfigService();
    let version = configService.get<string>('APP_VERSION');
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('infinitum')
      .setVersion(`${version}`)
      .build();
    Logger.verbose(version);
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/infinitum/docs', app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }
}
