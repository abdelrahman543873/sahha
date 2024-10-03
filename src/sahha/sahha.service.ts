import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { firstValueFrom } from 'rxjs';
import { BioMarkerDto } from './dtos/bio-marker.dto';

@Injectable()
export class SahhaService {
  constructor(private readonly httpService: HttpService) {}
  async getBioMarker(bioMarkerDto: BioMarkerDto) {
    const profileTokenResponse = await this.getProfileToken();
    return await firstValueFrom(
      this.httpService.get('/profile/biomarker', {
        params: bioMarkerDto,
        headers: {
          Authorization: `profile ${profileTokenResponse.profileToken}`,
        },
      }),
    );
  }

  async getProfileToken() {
    const { data: accountTokenResponse } = await firstValueFrom(
      this.getAccountToken(),
    );
    const { data } = await firstValueFrom(
      this.httpService.post(
        '/oauth/profile/register',
        {
          externalId: randomUUID(),
        },
        {
          headers: {
            Authorization: `account ${accountTokenResponse.accountToken}`,
          },
        },
      ),
    );
    return data;
  }

  getAccountToken() {
    return this.httpService.post('/oauth/account/token', {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
  }
}
