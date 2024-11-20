import { Module } from '@nestjs/common';
import { GoalsRepository } from 'src/modules/goals/goals.repository';
import { TransactionsRepository } from 'src/modules/transactions/repositories/transactions.repository';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaGoalsRepository } from './prisma/repositories/prisma-goals.repository';
import { PrismaTransactionsRepository } from './prisma/repositories/prisma-transactions.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';

@Module({
	providers: [
		PrismaService,
		{
			provide: UsersRepository,
			useClass: PrismaUsersRepository,
		},
		{
			provide: TransactionsRepository,
			useClass: PrismaTransactionsRepository,
		},
		{
			provide: GoalsRepository,
			useClass: PrismaGoalsRepository,
		},
	],
	exports: [UsersRepository, TransactionsRepository, GoalsRepository],
})
export class DatabaseModule {}
