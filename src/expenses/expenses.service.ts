import { HttpException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';

const moment = require('moment');

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}
  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const expense = await this.expenseModel.create(createExpenseDto);
    expense.createdAt = moment().format('MMMM Do YYYY');
    const savedExpense = await expense.save();

    return savedExpense;
  }

  findAll() {
    return this.expenseModel.find();
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id);
    if (!expense) {
      throw new HttpException('Expense Not Found', 404);
    }
    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.expenseModel.findByIdAndUpdate(
      id,
      updateExpenseDto,
      { new: true },
    );

    if (!expense) {
      throw new HttpException('Expense Not Found', 404);
    }
    return expense;
  }

  async remove(id: string) {
    const expense = await this.expenseModel.findByIdAndDelete(id);
    if (!expense) {
      throw new HttpException('Expense Not Found', 404);
    }
    return expense;
  }
}
