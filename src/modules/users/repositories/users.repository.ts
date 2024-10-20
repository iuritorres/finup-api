import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
	abstract create(createUserDto: CreateUserDto): Promise<User>;
	abstract findAll(): Promise<User[]>;
	abstract findOne(id: string): Promise<User>;
	abstract update(id: string, createUserDto: UpdateUserDto): Promise<User>;
	abstract delete(id: string): Promise<void>;
}
