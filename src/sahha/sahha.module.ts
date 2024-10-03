import { Module } from '@nestjs/common';
import { SahhaController } from './sahha.controller';
import { SahhaService } from './sahha.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('SAHHA_API'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SahhaController],
  providers: [SahhaService],
})
export class SahhaModule {}
