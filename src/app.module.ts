import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { validate } from './env.validation';
import { UsersModule } from './modules/users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, validate }),
		DatabaseModule,
		UsersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
