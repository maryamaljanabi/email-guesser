import { Test, TestingModule } from '@nestjs/testing';
import { EmailGuesserController } from './email-guesser.controller';

describe('EmailGuesserController', () => {
  let controller: EmailGuesserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailGuesserController],
    }).compile();

    controller = module.get<EmailGuesserController>(EmailGuesserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
