import { GoalDto } from 'src/modules/goals/dtos/goal.dto';
import { Goal } from 'src/modules/goals/goal.entity';

export class PrismaGoalsMapper {
	static toHttp({ id, name, amount, date, userId }: Goal): GoalDto {
		return {
			id,
			name,
			amount,
			date,
			userId,
		};
	}
}
