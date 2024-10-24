import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionsRepository } from './repositories/transactions.repository';

@Injectable()
export class TransactionsService {
	constructor(private repository: TransactionsRepository) {}

	async create(
		createTransactionDto: CreateTransactionDto,
	): Promise<Transaction> {
		const transaction = new Transaction({ ...createTransactionDto });
		return await this.repository.create(transaction);
	}

	async findAll(userId: string): Promise<Transaction[]> {
		return await this.repository.findAll(userId);
	}

	async findOne(id: string): Promise<Transaction> {
		return await this.repository.findOne(id);
	}

	async update(
		id: string,
		updateTransactionDto: UpdateTransactionDto,
	): Promise<Transaction> {
		return await this.repository.update(id, updateTransactionDto);
	}

	async delete(id: string): Promise<void> {
		return await this.repository.delete(id);
	}
}
