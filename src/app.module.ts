import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ExpensesModule,
    MongooseModule.forRoot(
      'mongodb+srv://giorgi22:10Aa56335@cluster0.o5vj2zl.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
