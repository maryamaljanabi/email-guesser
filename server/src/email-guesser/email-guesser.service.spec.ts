import { Test, TestingModule } from '@nestjs/testing';
import { EmailGuesserService } from './email-guesser.service';

describe('EmailGuesserService', () => {
  let service: EmailGuesserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailGuesserService],
    }).compile();

    service = module.get<EmailGuesserService>(EmailGuesserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
