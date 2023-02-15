import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BIKETYPE, VehicleType } from 'src/utils/enum/vehicleType.enum';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop({ unique: true })
  vehiclePlate: string;

  @Prop()
  branch: number;

  @Prop()
  model: string;

  @Prop()
  numberDoors: number;

  @Prop()
  vehicleType: VehicleType | BIKETYPE;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
