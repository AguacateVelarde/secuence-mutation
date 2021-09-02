import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMutationDTO } from './dto/create-mutation.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/mutation")
  async calculateMutation(@Body() createMutation: CreateMutationDTO, @Res() response: Response) {
    const hasMutation = await this.appService.hashMutation(createMutation.dna);
    const code = hasMutation
      ? HttpStatus.OK
      : HttpStatus.FORBIDDEN;
    
    return response.status(code).send({ hasMutation, code })
  }

  @Get("/summary")
  getSummary() {
    return this.appService.getSummary()
  }
}
