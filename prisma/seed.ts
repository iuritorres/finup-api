import { PrismaClient, TransactionType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const categories = [
	{
		id: '174e68ee-0bb7-4229-8142-92c361990cbe',
		label: 'Alimentação',
		type: TransactionType.EXPENSE,
	},
	{
		id: '26f4148f-8566-4b5c-bfdb-fd351a613dee',
		label: 'Moradia',
		type: TransactionType.EXPENSE,
	},
	{
		id: '5d8dc391-23af-490d-80cc-b248ded5af82',
		label: 'Educação',
		type: TransactionType.EXPENSE,
	},
	{
		id: 'a78de38e-48d9-49bb-a870-788d51228720',
		label: 'Salário',
		type: TransactionType.INCOME,
	},
	{
		id: 'c4ad0f8d-d469-4758-85ca-af10ab1a866c',
		label: 'Freelancer',
		type: TransactionType.INCOME,
	},
	{
		id: 'd35be64a-74d9-415e-ace8-a7bc4d0dc575',
		label: 'Lazer',
		type: TransactionType.EXPENSE,
	},
	{
		id: 'dd7571fe-59ed-4539-b418-b46ff757eb42',
		label: 'Saúde',
		type: TransactionType.EXPENSE,
	},
	{
		id: 'ffdc990c-ce03-4d65-9909-443031a4d2cb',
		label: 'Transporte',
		type: TransactionType.EXPENSE,
	},
];

const transactions = [
	{
		name: 'Aluguel',
		amount: 1000,
		type: TransactionType.EXPENSE,
		date: new Date('2023-10-01'),
		categoryId: categories.find((category) => category.label === 'Moradia')!
			.id,
	},
	{
		name: 'Landing Page Recifer',
		amount: 500,
		type: TransactionType.INCOME,
		date: new Date('2023-10-02'),
		categoryId: categories.find(
			(category) => category.label === 'Freelancer',
		)!.id,
	},
	{
		name: 'Jantar em Família',
		amount: 200,
		type: TransactionType.EXPENSE,
		date: new Date('2023-10-03'),
		categoryId: categories.find(
			(category) => category.label === 'Alimentação',
		)!.id,
	},
	{
		name: 'Compra de Supermercado',
		amount: 300,
		type: TransactionType.EXPENSE,
		date: new Date('2023-10-04'),
		categoryId: categories.find(
			(category) => category.label === 'Alimentação',
		)!.id,
	},
	{
		name: 'Mensalidade Escolar',
		amount: 500,
		type: TransactionType.EXPENSE,
		date: new Date('2023-10-05'),
		categoryId: categories.find(
			(category) => category.label === 'Educação',
		)!.id,
	},
	{
		name: 'Salário Mensal',
		amount: 3000,
		type: TransactionType.INCOME,
		date: new Date('2023-10-06'),
		categoryId: categories.find((category) => category.label === 'Salário')!
			.id,
	},
	{
		name: 'Projeto Freelancer',
		amount: 1000,
		type: TransactionType.INCOME,
		date: new Date('2023-10-07'),
		categoryId: categories.find(
			(category) => category.label === 'Freelancer',
		)!.id,
	},
	{
		name: 'Cinema com Amigos',
		amount: 50,
		type: TransactionType.EXPENSE,
		date: new Date('2023-10-08'),
		categoryId: categories.find((category) => category.label === 'Lazer')!
			.id,
	},
	{
		name: 'Consulta Médica',
		amount: 100,
		type: TransactionType.EXPENSE,
		date: new Date('2023-10-09'),
		categoryId: categories.find((category) => category.label === 'Saúde')!
			.id,
	},
	{
		name: 'Passagem de Ônibus',
		amount: 10,
		type: TransactionType.EXPENSE,
		date: new Date('2023-10-10'),
		categoryId: categories.find(
			(category) => category.label === 'Transporte',
		)!.id,
	},
];

async function main() {
	const user = await prisma.user.create({
		data: {
			email: 'iuri@gmail.com',
			password: await bcrypt.hash('root', 10),
			name: 'Iuri',
		},
	});

	for (const category of categories) {
		await prisma.transactionCategory.create({
			data: {
				id: category.id,
				name: category.label,
				type: category.type,
			},
		});
	}

	for (const transaction of transactions) {
		await prisma.transaction.create({
			data: {
				amount: transaction.amount,
				name: transaction.name,
				type: transaction.type,
				date: transaction.date,
				categoryId: transaction.categoryId,
				userId: user.id,
			},
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
