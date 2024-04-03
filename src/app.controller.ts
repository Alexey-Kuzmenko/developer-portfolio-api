import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({ description: 'Route for checking API availability' })
  getHello(): string {
    return this.appService.getHello();
  }
}
