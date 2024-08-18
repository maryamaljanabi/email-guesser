import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Injectable()
export class EmailGuessInputDto {
  @IsString({ message: 'fullName is required' })
  @ApiProperty()
  fullName: string;

  @IsString({ message: 'domain is required' })
  @ApiProperty()
  domain: string;
}
