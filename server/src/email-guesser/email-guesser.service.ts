import { HttpException, Injectable } from '@nestjs/common';
import { EmailGuessInputDto } from './dto/email-guess-input.dto';
import { EmailDatasetRepository } from './repositories/email-dataset.repository';
import { getEmail, getEmailRule } from './helpers/emailRules';
import { EmailGuessResponseDto } from './dto/email-guess-response.dto';

@Injectable()
export class EmailGuesserService {
  constructor(private emailDatasetRepository: EmailDatasetRepository) {}

  deriveEmail(input: EmailGuessInputDto): EmailGuessResponseDto {
    const domainEmails = this.emailDatasetRepository.getByDomain(input.domain);
    if (!domainEmails?.length)
      throw new HttpException(
        `The provided domain ${input.domain} is invalid`,
        400,
      );
    const emailRule = getEmailRule(domainEmails[0]);
    return { email: getEmail(input.fullName, input.domain, emailRule) };
  }
}
