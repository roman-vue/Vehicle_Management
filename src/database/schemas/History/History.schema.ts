import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HistoryDocument = HydratedDocument<History>;

@Schema()
export class History {
  @Prop()
  name: string;
  @Prop()
  lastName: string;
  @Prop()
  history: Array<Object>;
}

export const HistorySchema = SchemaFactory.createForClass(History);
