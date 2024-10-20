import { randomUUID } from 'crypto';
import { TransactionType } from '../enums/transaction-type.enum';

class IProps {
	id?: string;
	name: string;
	amount: number;
	type: TransactionType;
	date: Date;
	categoryId: string;
	userId: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Transaction {
	id: string;
	name: string;
	amount: number;
	type: TransactionType;
	date: Date;
	categoryId: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;

	constructor({
		id,
		name,
		amount,
		type,
		date,
		categoryId,
		userId,
		createdAt,
		updatedAt,
	}: IProps) {
		this.id = id || randomUUID();
		this.name = name;
		this.amount = amount;
		this.type = type;
		this.date = date;
		this.categoryId = categoryId;
		this.userId = userId;
		this.createdAt = createdAt || new Date();
		this.updatedAt = updatedAt || new Date();
	}
}
