import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
	abstract create(user: CreateUserDto): Promise<User>;
	abstract findAll(): Promise<User[]>;
	abstract findOne(id: string): Promise<User>;
	abstract update(id: string, user: UpdateUserDto): Promise<User>;
	abstract delete(id: string): Promise<void>;
}
