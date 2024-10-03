import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class BioMarkerDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description:
      'default two values that were seeded into sahha users to have data',
  })
  categories: string[] = ['sleep', 'activity'];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  types?: string[];

  @IsOptional()
  @IsDateString()
  startDateTime?: Date;

  @IsOptional()
  @IsDateString()
  endDateTime?: Date;
}
