import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dtos/update-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const userExists = await this.prisma.user.findUnique({
			where: { email: createUserDto.email },
		});

		if (userExists)
			throw new ConflictException({
				message: `User with email ${createUserDto.email} already exists`,
			});

		return await this.prisma.user.create({ data: createUserDto });
	}

	async findAll(): Promise<User[]> {
		return await this.prisma.user.findMany();
	}

	async findOne(id: string): Promise<User> {
		const user = await this.prisma.user.findUnique({ where: { id } });

		if (!user)
			throw new NotFoundException({
				message: `User with id ${id} not found`,
			});

		return user;
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		const userExists = await this.prisma.user.findUnique({ where: { id } });

		if (!userExists)
			throw new NotFoundException({
				message: `User with id ${id} not found`,
			});

		return await this.prisma.user.update({
			where: { id },
			data: updateUserDto,
		});
	}

	async delete(id: string): Promise<void> {
		const userExists = await this.prisma.user.findUnique({ where: { id } });

		if (!userExists)
			throw new NotFoundException({
				message: `User with id ${id} not found`,
			});

		await this.prisma.user.delete({ where: { id } });
	}
}
