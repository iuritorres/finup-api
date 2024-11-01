import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { FindAllTransactionsDto } from '../dtos/findall-transactions.dto';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionsRepository {
	abstract create(
		createTransactionDto: CreateTransactionDto,
	): Promise<Transaction>;
	abstract findAll(userId: string): Promise<FindAllTransactionsDto[]>;
	abstract findOne(id: string): Promise<Transaction>;
	abstract update(
		id: string,
		updateTransactionDto: UpdateTransactionDto,
	): Promise<Transaction>;
	abstract delete(id: string): Promise<void>;
}
