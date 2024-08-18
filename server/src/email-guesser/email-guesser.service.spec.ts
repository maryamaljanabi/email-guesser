import { Test, TestingModule } from '@nestjs/testing';
import { EmailGuesserService } from './email-guesser.service';
import { EmailDatasetRepository } from './repositories/email-dataset.repository';
import { HttpException } from '@nestjs/common';

describe('EmailGuesserService', () => {
  let service: EmailGuesserService;
  let repository: EmailDatasetRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailGuesserService,
        {
          provide: EmailDatasetRepository,
          useValue: {
            getByDomain: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailGuesserService>(EmailGuesserService);
    repository = module.get<EmailDatasetRepository>(EmailDatasetRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should derive email correctly for first_name_last_name format', () => {
    jest
      .spyOn(repository, 'getByDomain')
      .mockReturnValue([
        { fullName: 'David Stein', email: 'davidstein@google.com' },
      ]);

    const result = service.deriveEmail({
      fullName: 'Matthew Hall',
      domain: 'google.com',
    });

    expect(result).toEqual({ email: 'matthewhall@google.com' });
  });

  it('should derive email correctly for first_name_initial_last_name format', () => {
    jest
      .spyOn(repository, 'getByDomain')
      .mockReturnValue([{ fullName: 'Jane Doe', email: 'jdoe@babbel.com' }]);

    const result = service.deriveEmail({
      fullName: 'Nina Simons',
      domain: 'babbel.com',
    });

    expect(result).toEqual({ email: 'nsimons@babbel.com' });
  });

  it('should throw an error if domain is invalid', () => {
    jest.spyOn(repository, 'getByDomain').mockReturnValue([]);

    expect(() =>
      service.deriveEmail({
        fullName: 'Robert Miller',
        domain: 'slideshare.net',
      }),
    ).toThrow(HttpException);
  });
});
