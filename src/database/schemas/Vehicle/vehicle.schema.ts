import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { VehicleType } from 'src/utils/enum/vehicleType.enum';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop({ unique: true })
  vehiclePlate: string;

  @Prop()
  branch: string;

  @Prop()
  model: string;

  @Prop()
  numberDoors: number;

  @Prop()
  vehicleType: VehicleType;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
