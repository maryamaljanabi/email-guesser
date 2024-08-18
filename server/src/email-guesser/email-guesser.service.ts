import { HttpException, Injectable } from '@nestjs/common';
import { EmailGuessInputDto } from './dto/email-guess-input.dto';
import { EmailDatasetRepository } from './repositories/email-dataset.repository';
import { getEmail, getEmailRule } from './helpers/emailRules';

@Injectable()
export class EmailGuesserService {
  constructor(private emailDatasetRepository: EmailDatasetRepository) {}

  deriveEmail(input: EmailGuessInputDto): string {
    const domainEmails = this.emailDatasetRepository.getByDomain(input.domain);
    if (!domainEmails?.length)
      throw new HttpException(
        `The provided domain ${input.domain} is invalid`,
        400,
      );
    const emailRule = getEmailRule(domainEmails[0]);
    return getEmail(input.fullName, input.domain, emailRule);
  }
}
