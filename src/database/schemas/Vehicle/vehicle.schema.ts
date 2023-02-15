import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
  numberDoors: string;

  @Prop()
  vehicleType: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
