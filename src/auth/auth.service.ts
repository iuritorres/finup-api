import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaUsersMapper } from 'src/database/prisma/mappers/prisma-users.mapper';
import { UserDto } from 'src/modules/users/dtos/user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(
		email: string,
		password: string,
	): Promise<UserDto | null> {
		const user = await this.usersService.findOne(email);
		const isPasswordMatching = await compare(password, user.password);

		if (user && isPasswordMatching) return PrismaUsersMapper.toHttp(user);
		return null;
	}

	async login(user: UserDto) {
		const payload = { email: user.email, sub: user.id };
		return { access_token: this.jwtService.sign(payload), user };
	}
}
