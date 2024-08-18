import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EmailGuessInputDto } from './dto/email-guess-input.dto';
import { EmailGuesserService } from './email-guesser.service';

@Controller('email-guesser')
export class EmailGuesserController {
  constructor(private readonly emailGuesserService: EmailGuesserService) {}

  @Post()
  guessEmail(@Body() body: EmailGuessInputDto) {
    return this.emailGuesserService.deriveEmail(body);
  }
}
