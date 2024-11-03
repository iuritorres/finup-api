import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from 'src/modules/transactions/dtos/create-transaction.dto';
import { UpdateTransactionDto } from 'src/modules/transactions/dtos/update-transaction.dto';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { TransactionType } from 'src/modules/transactions/enums/transaction-type.enum';
import { TransactionsRepository } from 'src/modules/transactions/repositories/transactions.repository';
import { PrismaService } from '../prisma.service';
import { FindAllTransactionsDto } from 'src/modules/transactions/dtos/findall-transactions.dto';

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(
		createTransactionDto: CreateTransactionDto,
	): Promise<Transaction> {
		const userExists = await this.prisma.user.findUnique({
			where: { id: createTransactionDto.userId },
		});

		if (!userExists)
			throw new NotFoundException({
				message: `User with id ${createTransactionDto.userId} not found`,
			});

		const transactionCategoryExists =
			await this.prisma.transactionCategory.findUnique({
				where: { id: createTransactionDto.categoryId },
			});

		if (!transactionCategoryExists)
			throw new NotFoundException({
				message: `Transaction category with id ${createTransactionDto.categoryId} not found`,
			});

		const transaction = await this.prisma.transaction.create({
			data: { ...createTransactionDto },
		});

		return { ...transaction, type: transaction.type as TransactionType };
	}

	async findAll(userId: string): Promise<FindAllTransactionsDto[]> {
		const transactions = await this.prisma.transaction.findMany({
			where: { userId },
			include: {
				category: {
					select: {
						name: true,
					},
				},
			},
			orderBy: { date: 'desc' },
		});

		return transactions.map((transaction) => ({
			...transaction,
			type: transaction.type as TransactionType,
		}));
	}

	async findOne(id: string): Promise<Transaction> {
		const transaction = await this.prisma.transaction.findUnique({
			where: { id },
		});

		if (!transaction)
			throw new NotFoundException({
				message: `Transaction with id ${id} not found`,
			});

		return { ...transaction, type: transaction.type as TransactionType };
	}

	async update(
		id: string,
		updateTransactionDto: UpdateTransactionDto,
	): Promise<Transaction> {
		const transactionExists = await this.prisma.transaction.findUnique({
			where: { id },
		});

		if (!transactionExists)
			throw new NotFoundException({
				message: `Transaction with id ${id} not found`,
			});

		const transaction = await this.prisma.transaction.update({
			where: { id },
			data: updateTransactionDto,
		});

		return { ...transaction, type: transaction.type as TransactionType };
	}

	async delete(id: string): Promise<void> {
		const transactionExists = await this.prisma.transaction.findUnique({
			where: { id },
		});

		if (!transactionExists)
			throw new NotFoundException({
				message: `Transaction with id ${id} not found`,
			});

		await this.prisma.transaction.delete({ where: { id } });
	}
}
