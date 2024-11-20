import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dtos/create-goal.dto';
import { GoalDto } from './dtos/goal.dto';
import { UpdateGoalDto } from './dtos/update-goal.dto';
import { Goal } from './goal.entity';
import { GoalsRepository } from './goals.repository';

@Injectable()
export class GoalsService {
	constructor(private repository: GoalsRepository) {}

	async create(createGoalDto: CreateGoalDto): Promise<Goal> {
		const goal = new Goal({ ...createGoalDto });
		return await this.repository.create(goal);
	}

	async findAll(userId: string): Promise<GoalDto[]> {
		return await this.repository.findAll(userId);
	}

	async findOne(id: string): Promise<Goal> {
		return await this.repository.findOne(id);
	}

	async update(id: string, updateGoalDto: UpdateGoalDto): Promise<Goal> {
		return await this.repository.update(id, updateGoalDto);
	}

	async delete(id: string): Promise<void> {
		return await this.repository.delete(id);
	}
}
