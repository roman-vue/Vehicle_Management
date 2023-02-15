import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop()
  name: string;
  @Prop()
  lastName: string;
  @Prop()
  age: number;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  birthdate: Date;
  @Prop()
  identification: string;
  @Prop()
  profession: string;
  @Prop()
  married: boolean;
  @Prop()
  monthlyIncome: number;
  @Prop({ type: Object })
  currentVehicle: Object;
}

export const UserSchema = SchemaFactory.createForClass(Users);
