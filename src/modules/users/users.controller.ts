import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { PrismaUsersMapper } from 'src/database/prisma/mappers/prisma-users.mapper';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Post()
	async create(@Body() body: CreateUserDto): Promise<UserDto> {
		const user = await this.service.create(body);
		return PrismaUsersMapper.toHttp(user);
	}

	@Get()
	async findAll(): Promise<UserDto[]> {
		const users = await this.service.findAll();
		return users.map((user) => PrismaUsersMapper.toHttp(user));
	}

	@Get(':email')
	async findOne(@Param('email') email: string): Promise<UserDto> {
		const user = await this.service.findOne(email);
		return PrismaUsersMapper.toHttp(user);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateUserDto,
	): Promise<UserDto> {
		const user = await this.service.update(id, body);
		return PrismaUsersMapper.toHttp(user);
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<void> {
		return this.service.delete(id);
	}
}
