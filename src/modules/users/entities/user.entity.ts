import { randomUUID } from 'crypto';

class IProps {
	id?: string;
	email: string;
	name: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class User {
	id: string;
	email: string;
	name: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;

	constructor({ id, email, name, password, createdAt, updatedAt }: IProps) {
		this.id = id || randomUUID();
		this.email = email;
		this.name = name;
		this.password = password;
		this.createdAt = createdAt || new Date();
		this.updatedAt = updatedAt || new Date();
	}
}
