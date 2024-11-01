import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
} from '@nestjs/common';
import { PrismaTransactionsMapper } from 'src/database/prisma/mappers/prisma-transactions.mapper';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { FindAllTransactionsDto } from './dtos/findall-transactions.dto';
import { TransactionDto } from './dtos/transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
	constructor(private readonly service: TransactionsService) {}

	@Post()
	async create(
		@Request() request,
		@Body() body: CreateTransactionDto,
	): Promise<TransactionDto> {
		const transaction = await this.service.create({
			...body,
			userId: request.user.userId,
		});

		return PrismaTransactionsMapper.toHttp(transaction);
	}

	@Get()
	async findAll(@Request() request): Promise<FindAllTransactionsDto[]> {
		const transactions = await this.service.findAll(request.user.userId);
		return transactions;
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
