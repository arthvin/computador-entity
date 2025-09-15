import { Controller, Post, Body, Get, Patch, Delete, Param, Request } from '@nestjs/common';
import { PerifericoService } from './periferico.service';

@Controller('periferico')
export class PerifericoController {
  constructor(private perifService: PerifericoService) {}

  @Post('create')
  create(@Body() body: { nome: string; }) {
    return this.perifService.create(body.nome);
  }

  @Get(':nome')
  findOne(@Param('nome') nome: string) {
    return this.perifService.findOne(nome);
  }

  @Patch(':nome')
  update(@Param('nome') nome: string, @Body() data: any) {
    return this.perifService.update(nome, data);
  }

  @Delete(':nome')
  remove(@Param('nome') nome: string) {
    return this.perifService.delete(nome);
  }

  @Get()
  findAll() {
    return this.perifService.findAll();
  }
}
