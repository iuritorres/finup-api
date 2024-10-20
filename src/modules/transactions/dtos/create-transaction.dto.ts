import {
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsString,
	IsUUID,
} from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class CreateTransactionDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	amount: number;

	@IsNotEmpty()
	@IsEnum(TransactionType)
	type: TransactionType;

	@IsNotEmpty()
	@IsDateString()
	date: Date;

	@IsNotEmpty()
	@IsUUID()
	categoryId: string;

	@IsNotEmpty()
	@IsUUID()
	userId: string;
}
