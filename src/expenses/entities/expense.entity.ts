import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Expense {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  cost: number;
  @Prop()
  createdAt: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
