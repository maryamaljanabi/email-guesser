import { Module } from '@nestjs/common';
import { EmailGuesserController } from './email-guesser.controller';
import { EmailGuesserService } from './email-guesser.service';

@Module({
  controllers: [EmailGuesserController],
  providers: [EmailGuesserService]
})
export class EmailGuesserModule {}
