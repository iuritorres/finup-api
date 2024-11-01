export class FindAllTransactionsDto {
	id: string;
	name: string;
	amount: number;
	type: string;
	date: Date;
	categoryId: string;
	category: {
		name: string;
	};
	userId: string;
}
