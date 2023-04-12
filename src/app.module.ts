import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConvertService } from './convert/convert.service';
import { ConvertController } from './convert/convert.controller';

@Module({
  imports: [],
  controllers: [AppController, ConvertController],
  providers: [AppService, ConvertService],
})
export class AppModule {}
