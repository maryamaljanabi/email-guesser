import { Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';

@Injectable()
export class EmailGuessInputDto {
  @IsString({ message: 'fullName is required' })
  fullName: string;

  @IsString({ message: 'domain is required' })
  domain: string;
}
