import { UserDto } from 'src/modules/users/dtos/user.dto';
import { User } from 'src/modules/users/entities/user.entity';

export class PrismaUsersMapper {
	static toHttp({ id, email, name, createdAt, updatedAt }: User): UserDto {
		return {
			id,
			email,
			name,
			createdAt,
			updatedAt,
		};
	}
}
