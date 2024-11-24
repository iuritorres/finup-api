import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalDto } from 'src/modules/goals/dtos/create-goal.dto';
import { GoalDto } from 'src/modules/goals/dtos/goal.dto';
import { UpdateGoalDto } from 'src/modules/goals/dtos/update-goal.dto';
import { Goal } from 'src/modules/goals/goal.entity';
import { GoalsRepository } from 'src/modules/goals/goals.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaGoalsRepository implements GoalsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(createGoalDto: CreateGoalDto): Promise<Goal> {
		const userExists = await this.prisma.user.findUnique({
			where: { id: createGoalDto.userId },
		});

		if (!userExists)
			throw new NotFoundException(
				`User with id ${createGoalDto.userId} not found`,
			);

		return await this.prisma.goal.create({
			data: { ...createGoalDto },
		});
	}

	async findAll(userId: string): Promise<GoalDto[]> {
		return await this.prisma.goal.findMany({
			where: { userId },
			orderBy: { date: 'desc' },
		});
	}

	async findOne(id: string): Promise<Goal> {
		const goal = await this.prisma.goal.findUnique({
			where: { id },
		});

		if (!goal) throw new NotFoundException(`Goal with id ${id} not found`);

		return goal;
	}

	async update(id: string, updateGoalDto: UpdateGoalDto): Promise<Goal> {
		const goalExists = await this.prisma.goal.findUnique({
			where: { id },
		});

		if (!goalExists)
			throw new NotFoundException(`Goal with id ${id} not found`);

		return await this.prisma.goal.update({
			where: { id },
			data: updateGoalDto,
		});
	}

	async delete(id: string): Promise<void> {
		const goalExists = await this.prisma.goal.findUnique({
			where: { id },
		});

		if (!goalExists)
			throw new NotFoundException(`Goal with id ${id} not found`);

		await this.prisma.goal.delete({ where: { id } });
	}
}
