import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Vehicle,
  VehicleSchema,
} from 'src/database/schemas/Vehicle/vehicle.schema';
import { UsersModule } from '../users/users.module';
import {
  HistorySchema,
  History,
} from 'src/database/schemas/History/History.schema';
import { UserSchema, Users } from 'src/database/schemas/Users/users.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: History.name, schema: HistorySchema },
      { name: Users.name, schema: UserSchema },
    ]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
