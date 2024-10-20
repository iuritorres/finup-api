import { randomUUID } from 'crypto';
import { TransactionType } from '../enums/transaction-type.enum';

class IProps {
	id?: string;
	amount: number;
	type: TransactionType;
	categoryId: string;
	userId: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Transaction {
	id: string;
	amount: number;
	type: TransactionType;
	categoryId: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;

	constructor({
		id,
		amount,
		type,
		categoryId,
		userId,
		createdAt,
		updatedAt,
	}: IProps) {
		this.id = id || randomUUID();
		this.amount = amount;
		this.type = type;
		this.categoryId = categoryId;
		this.userId = userId;
		this.createdAt = createdAt || new Date();
		this.updatedAt = updatedAt || new Date();
	}
}
