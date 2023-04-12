import { Body, Controller, Post } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { ConversionRequestDto } from './dto/conversion-request.dto';

@Controller('convert')
export class ConvertController {
  constructor(private readonly convertService: ConvertService) {}

  @Post()
  getConvertedFile(@Body() req: ConversionRequestDto): string {
    return JSON.stringify(this.convertService.convert(req));
  }
}
