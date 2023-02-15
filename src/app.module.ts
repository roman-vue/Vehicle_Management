import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UsersModule } from './modules/users/users.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
const configService = new ConfigService();
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(`${configService.get<string>('URI_MONGODB')}`),
    UsersModule,
    VehicleModule,
  ],
})
export class AppModule {}
