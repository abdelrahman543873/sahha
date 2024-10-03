import { IsOptional, IsString } from 'class-validator';
import { BioMarkerDto } from './bio-marker.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto extends BioMarkerDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'default user external id that was seeded on sahha side',
  })
  externalId?: string = process.env.EXISTING_USER_ID;
}
