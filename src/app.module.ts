import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SahhaModule } from './sahha/sahha.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SahhaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
