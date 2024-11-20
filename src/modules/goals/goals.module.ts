import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';

@Module({
	imports: [DatabaseModule],
	controllers: [GoalsController],
	providers: [GoalsService],
})
export class GoalsModule {}
