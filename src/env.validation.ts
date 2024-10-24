import { plainToInstance } from 'class-transformer';
import {
	IsNotEmpty,
	IsNumber,
	IsString,
	Max,
	Min,
	validateSync,
} from 'class-validator';

class EnvironmentVariables {
	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	@Max(65535)
	PORT: number;

	@IsNotEmpty()
	@IsString()
	JWT_SECRET: string;

	@IsNotEmpty()
	DATABASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) throw new Error(errors.toString());
	return validatedConfig;
}
