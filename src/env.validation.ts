import { plainToInstance } from 'class-transformer';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    Max,
    Min,
    validateSync,
} from 'class-validator';

enum Environment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
    PROVISION = 'provision',
}

class EnvironmentVariables {
    @IsNotEmpty()
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;

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
