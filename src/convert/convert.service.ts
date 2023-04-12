import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { createHash, randomBytes } from 'crypto';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { ConversionErrorDto } from './dto/conversion-error.dto';
import { ConversionRequestDto } from './dto/conversion-request.dto';
import { ConvertedFileDto } from './dto/converted-file.dto';

@Injectable()
export class ConvertService {
  convert(req: ConversionRequestDto): object {
    // Generatin temp input filename
    const inputFilename =
      '/tmp/' +
      createHash('sha256').update(randomBytes(1000).toString()).digest('hex') +
      '.' +
      req.inputFormat;

    // Generating temp output filename
    const outputFilename =
      '/tmp/' +
      createHash('sha256').update(randomBytes(1000).toString()).digest('hex') +
      '.' +
      req.outputFormat;

    // Conversion with unoonvert
    try {
      const buf: Buffer = Buffer.from(req.fileBase64, 'base64');
      let timeout = 30;

      if (req.timeout !== undefined) {
        timeout = req.timeout;
      }

      // Writing Local input file
      writeFileSync(inputFilename, buf, 'binary');

      // Executing conversion
      execSync(
        '/usr/bin/timeout ' +
          timeout +
          ' unoconvert --convert-to ' +
          req.outputFormat +
          ' ' +
          inputFilename +
          ' ' +
          outputFilename,
      );

      // Remove input file
      rmSync(inputFilename);

      if (existsSync(outputFilename)) {
        const file = readFileSync(outputFilename);
        const output: ConvertedFileDto = {
          statusCode: 200,
          format: req.outputFormat,
          fileBase64: file.toString('base64'),
        };

        // Remove output file
        rmSync(outputFilename);

        return output;
      } else {
        const output: ConversionErrorDto = {
          statusCode: 415,
          message: "Can't generate output file",
        };
        return output;
      }
    } catch (err) {
      // Eventually remove input file
      if (existsSync(inputFilename)) {
        rmSync(inputFilename);
      }

      const output: ConversionErrorDto = {
        statusCode: err.status,
        message: err.toString(),
      };
      return output;
    }
  }
}
