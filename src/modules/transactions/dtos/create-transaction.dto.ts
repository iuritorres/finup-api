import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class CreateTransactionDto {
	@IsNotEmpty()
	@IsNumber()
	amount: number;

	@IsNotEmpty()
	@IsEnum(TransactionType)
	type: TransactionType;

	@IsNotEmpty()
	@IsUUID()
	categoryId: string;

	@IsNotEmpty()
	@IsUUID()
	userId: string;
}
