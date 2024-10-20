import { TransactionDto } from 'src/modules/transactions/dtos/transaction.dto';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';

export class PrismaTransactionsMapper {
	static toHttp({
		id,
		amount,
		type,
		categoryId,
		userId,
	}: Transaction): TransactionDto {
		return {
			id,
			amount,
			type,
			categoryId,
			userId,
		};
	}
}
