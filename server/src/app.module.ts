import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailGuesserModule } from './email-guesser/email-guesser.module';

@Module({
  imports: [EmailGuesserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
