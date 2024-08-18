import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EmailGuessInputDto } from './dto/email-guess-input.dto';
import { EmailGuesserService } from './email-guesser.service';
import { EmailGuessResponseDto } from './dto/email-guess-response.dto';

@Controller('email-guesser')
export class EmailGuesserController {
  constructor(private readonly emailGuesserService: EmailGuesserService) {}

  @Post()
  @HttpCode(200)
  guessEmail(@Body() body: EmailGuessInputDto): EmailGuessResponseDto {
    return this.emailGuesserService.deriveEmail(body);
  }
}
