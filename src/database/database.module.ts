import { Module } from '@nestjs/common';
import { TransactionsRepository } from 'src/modules/transactions/repositories/transactions.repository';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTransactionsRepository } from './prisma/repositories/prisma-transactions.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';

@Module({
	providers: [
		PrismaService,
		{ provide: UsersRepository, useClass: PrismaUsersRepository },
		{
			provide: TransactionsRepository,
			useClass: PrismaTransactionsRepository,
		},
	],
	exports: [UsersRepository, TransactionsRepository],
})
export class DatabaseModule {}
