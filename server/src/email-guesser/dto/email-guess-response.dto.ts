import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Injectable()
export class EmailGuessResponseDto {
  @IsString()
  @ApiProperty()
  email: string;
}
