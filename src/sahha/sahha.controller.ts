import { Controller, Get, Query } from '@nestjs/common';
import { SahhaService } from './sahha.service';
import { BioMarkerDto } from './dtos/bio-marker.dto';
import { ProfileDto } from './dtos/profile.dto';

@Controller('sahha')
export class SahhaController {
  constructor(private readonly sahhaService: SahhaService) {}

  @Get('bio-marker')
  async getBioMarker(@Query() bioMarkerDto: BioMarkerDto) {
    return await this.sahhaService.getBioMarker(bioMarkerDto);
  }

  @Get('profile')
  async getProfileBioMarkers(@Query() profileDto: ProfileDto) {
    return await this.sahhaService.getProfileBioMarkers(profileDto);
  }

  @Get('demographic')
  async getDemographic() {
    return await this.sahhaService.getDemoGraphic();
  }
}
