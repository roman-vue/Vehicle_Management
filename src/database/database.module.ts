import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const configService = new ConfigService();
@Module({
  imports: [MongooseModule.forRoot(configService.get<string>('URI_MONGODB'))],
})
export class DatabaseModule {}
