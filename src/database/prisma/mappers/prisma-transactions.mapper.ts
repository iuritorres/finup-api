import { TransactionDto } from 'src/modules/transactions/dtos/transaction.dto';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';

export class PrismaTransactionsMapper {
	static toHttp({
		id,
		name,
		amount,
		type,
		date,
		categoryId,
		userId,
	}: Transaction): TransactionDto {
		return {
			id,
			name,
			amount,
			type,
			date,
			categoryId,
			userId,
		};
	}
}
