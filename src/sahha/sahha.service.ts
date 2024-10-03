import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { BioMarkerDto } from './dtos/bio-marker.dto';
import { ProfileDto } from './dtos/profile.dto';
import { stringify } from 'qs';

@Injectable()
export class SahhaService {
  constructor(private readonly httpService: HttpService) {}
  async getProfileToken() {
    const { data: accountTokenResponse } = await firstValueFrom(
      this.getAccountToken(),
    );
    const externalId = process.env.EXISTING_USER_ID;
    const { data } = await firstValueFrom(
      this.httpService.post(
        '/oauth/profile/register',
        {
          externalId,
        },
        {
          headers: {
            Authorization: `account ${accountTokenResponse.accountToken}`,
          },
        },
      ),
    );
    return {
      ...data,
      externalId,
      accountToken: accountTokenResponse.accountToken,
    };
  }

  async getBioMarker(bioMarkerDto: BioMarkerDto) {
    const profileTokenResponse = await this.getProfileToken();
    const { data } = await firstValueFrom(
      this.httpService.get('/profile/biomarker', {
        params: bioMarkerDto,
        headers: {
          Authorization: `profile ${profileTokenResponse.profileToken}`,
        },
        paramsSerializer: (params) =>
          stringify(params, { arrayFormat: 'repeat' }),
      }),
    );
    return data;
  }

  async getProfileBioMarkers(profileDto: ProfileDto) {
    const profileTokeResponse = await this.getProfileToken();
    const { data } = await firstValueFrom(
      this.httpService.get(
        `/profile/biomarker/${profileDto?.externalId || profileTokeResponse.externalId}`,
        {
          params: profileDto,
          headers: {
            Authorization: `account ${profileTokeResponse.accountToken}`,
          },
          paramsSerializer: (params) =>
            stringify(params, { arrayFormat: 'repeat' }),
        },
      ),
    );
    return data;
  }

  async getDemoGraphic() {
    const profileTokeResponse = await this.getProfileToken();
    const { data } = await firstValueFrom(
      this.httpService.get('/profile/demographic', {
        headers: {
          Authorization: `profile ${profileTokeResponse.profileToken}`,
        },
      }),
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
