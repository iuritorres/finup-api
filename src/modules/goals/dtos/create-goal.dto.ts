import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGoalDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	amount: number;

	@IsNotEmpty()
	@IsDateString()
	date: Date;

	userId: string;
}
