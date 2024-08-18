import { Module } from '@nestjs/common';
import { EmailGuesserService } from './email-guesser.service';
import { EmailGuesserController } from './email-guesser.controller';
import { EmailDatasetRepository } from './repositories/email-dataset.repository';

@Module({
  providers: [EmailGuesserService, EmailDatasetRepository],
  controllers: [EmailGuesserController],
})
export class EmailGuesserModule {}
