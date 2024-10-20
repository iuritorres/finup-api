import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionsRepository {
	abstract create(
		createTransactionDto: CreateTransactionDto,
	): Promise<Transaction>;
	abstract findAll(): Promise<Transaction[]>;
	abstract findOne(id: string): Promise<Transaction>;
	abstract update(
		id: string,
		updateTransactionDto: UpdateTransactionDto,
	): Promise<Transaction>;
	abstract delete(id: string): Promise<void>;
}
