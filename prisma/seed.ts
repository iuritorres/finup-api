import { PrismaClient, TransactionType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const categories = [
	{
		label: 'Alimentação',
		value: '174e68ee-0bb7-4229-8142-92c361990cbe',
		type: TransactionType.EXPENSE,
	},
	{
		label: 'Moradia',
		value: '26f4148f-8566-4b5c-bfdb-fd351a613dee',
		type: TransactionType.EXPENSE,
	},
	{
		label: 'Educação',
		value: '5d8dc391-23af-490d-80cc-b248ded5af82',
		type: TransactionType.EXPENSE,
	},
	{
		label: 'Salário',
		value: 'a78de38e-48d9-49bb-a870-788d51228720',
		type: TransactionType.INCOME,
	},
	{
		label: 'Freelancer',
		value: 'c4ad0f8d-d469-4758-85ca-af10ab1a866c',
		type: TransactionType.INCOME,
	},
	{
		label: 'Lazer',
		value: 'd35be64a-74d9-415e-ace8-a7bc4d0dc575',
		type: TransactionType.EXPENSE,
	},
	{
		label: 'Saúde',
		value: 'dd7571fe-59ed-4539-b418-b46ff757eb42',
		type: TransactionType.EXPENSE,
	},
	{
		label: 'Transporte',
		value: 'ffdc990c-ce03-4d65-9909-443031a4d2cb',
		type: TransactionType.EXPENSE,
	},
];

const transactionNames = [
	'Aluguel',
	'Landing Page Recifer',
	'Jantar em Família',
	'Compra de Supermercado',
	'Mensalidade Escolar',
	'Salário Mensal',
	'Projeto Freelancer',
	'Cinema com Amigos',
	'Consulta Médica',
	'Passagem de Ônibus',
];

function getRandomTransactionName() {
	return transactionNames[
		Math.floor(Math.random() * transactionNames.length)
	];
}

async function main() {
	const hashedPassword = await bcrypt.hash('root', 10);

	const user = await prisma.user.create({
		data: {
			email: 'iuri@gmail.com',
			password: hashedPassword,
			name: 'Iuri',
		},
	});

	for (const category of categories) {
		await prisma.transactionCategory.create({
			data: {
				id: category.value,
				name: category.label,
				type: category.type,
			},
		});

		const transactionCount = Math.floor(Math.random() * 3) + 1;

		for (let i = 0; i < transactionCount; i++) {
			await prisma.transaction.create({
				data: {
					name: getRandomTransactionName(),
					amount: Math.random() * 100,
					type: category.type,
					date: new Date(
						`2023-10-${Math.floor(Math.random() * 31) + 1}`,
					),
					categoryId: category.value,
					userId: user.id,
				},
			});
		}
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
