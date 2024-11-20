import { CreateGoalDto } from './dtos/create-goal.dto';
import { UpdateGoalDto } from './dtos/update-goal.dto';
import { GoalDto } from './dtos/goal.dto';
import { Goal } from './goal.entity';

export abstract class GoalsRepository {
	abstract create(createGoalDto: CreateGoalDto): Promise<Goal>;
	abstract findAll(userId: string): Promise<GoalDto[]>;
	abstract findOne(id: string): Promise<Goal>;
	abstract update(id: string, updateGoalDto: UpdateGoalDto): Promise<Goal>;
	abstract delete(id: string): Promise<void>;
}
