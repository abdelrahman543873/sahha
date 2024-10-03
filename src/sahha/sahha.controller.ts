import { Controller, Get, Query } from '@nestjs/common';
import { SahhaService } from './sahha.service';
import { BioMarkerDto } from './dtos/bio-marker.dto';

@Controller('sahha')
export class SahhaController {
  constructor(private readonly sahhaService: SahhaService) {}

  @Get('bio-marker')
  async getBioMarker(@Query() bioMarkerDto: BioMarkerDto) {
    return await this.sahhaService.getBioMarker(bioMarkerDto);
  }
}
