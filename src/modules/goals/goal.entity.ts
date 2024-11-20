import { randomUUID } from 'crypto';

class IProps {
	id?: string;
	name: string;
	amount: number;
	date: Date;
	userId: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Goal {
	id: string;
	name: string;
	amount: number;
	date: Date;
	userId: string;
	createdAt: Date;
	updatedAt: Date;

	constructor({
		id,
		name,
		amount,
		date,
		userId,
		createdAt,
		updatedAt,
	}: IProps) {
		this.id = id || randomUUID();
		this.name = name;
		this.amount = amount;
		this.date = date;
		this.userId = userId;
		this.createdAt = createdAt || new Date();
		this.updatedAt = updatedAt || new Date();
	}
}
