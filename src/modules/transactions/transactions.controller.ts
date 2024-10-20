import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { PrismaTransactionsMapper } from 'src/database/prisma/mappers/prisma-transactions.mapper';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionDto } from './dtos/transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
	constructor(private readonly service: TransactionsService) {}

	@Post()
	async create(@Body() body: CreateTransactionDto): Promise<TransactionDto> {
		const transaction = await this.service.create(body);
		return PrismaTransactionsMapper.toHttp(transaction);
	}

	@Get()
	async findAll(): Promise<TransactionDto[]> {
		const transactions = await this.service.findAll();
		return transactions.map((transaction) =>
			PrismaTransactionsMapper.toHttp(transaction),
		);
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<TransactionDto> {
		const transaction = await this.service.findOne(id);
		return PrismaTransactionsMapper.toHttp(transaction);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateTransactionDto,
	): Promise<TransactionDto> {
		const transaction = await this.service.update(id, body);
		return PrismaTransactionsMapper.toHttp(transaction);
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<void> {
		return this.service.delete(id);
	}
}
