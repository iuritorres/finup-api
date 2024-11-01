import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/constants';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { PrismaUsersMapper } from './database/prisma/mappers/prisma-users.mapper';
import { CreateUserDto } from './modules/users/dtos/create-user.dto';
import { UserDto } from './modules/users/dtos/user.dto';
import { UsersService } from './modules/users/users.service';

@Controller()
export class AppController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() request) {
		console.log('oxe');
		return this.authService.login(request.user);
	}

	@Public()
	@Post('auth/register')
	async register(@Body() body: CreateUserDto): Promise<UserDto> {
		const user = await this.usersService.create(body);
		return PrismaUsersMapper.toHttp(user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() request) {
		return request.user;
	}
}
