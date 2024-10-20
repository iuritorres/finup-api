import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
	constructor(private repository: UsersRepository) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = new User({
			...createUserDto,
			password: await hash(createUserDto.password, 10),
		});

		return await this.repository.create(user);
	}

	async findAll(): Promise<User[]> {
		return await this.repository.findAll();
	}

	async findOne(id: string): Promise<User> {
		return await this.repository.findOne(id);
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		return await this.repository.update(id, updateUserDto);
	}

	async delete(id: string): Promise<void> {
		return await this.repository.delete(id);
	}
}
