import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
} from '@nestjs/common';
import { PrismaGoalsMapper } from 'src/database/prisma/mappers/prisma-goals.mapper';
import { CreateGoalDto } from './dtos/create-goal.dto';
import { GoalDto } from './dtos/goal.dto';
import { UpdateGoalDto } from './dtos/update-goal.dto';
import { GoalsService } from './goals.service';

@Controller('goals')
export class GoalsController {
	constructor(private readonly service: GoalsService) {}

	@Post()
	async create(
		@Request() request,
		@Body() body: CreateGoalDto,
	): Promise<GoalDto> {
		const goal = await this.service.create({
			...body,
			userId: request.user.userId,
		});

		return PrismaGoalsMapper.toHttp(goal);
	}

	@Get()
	async findAll(@Request() request): Promise<GoalDto[]> {
		const goals = await this.service.findAll(request.user.userId);
		return goals;
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<GoalDto> {
		const goal = await this.service.findOne(id);
		return PrismaGoalsMapper.toHttp(goal);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateGoalDto,
	): Promise<GoalDto> {
		const goal = await this.service.update(id, body);
		return PrismaGoalsMapper.toHttp(goal);
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<void> {
		return this.service.delete(id);
	}
}
