import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { PerifericoService } from './periferico.service';

@Controller('periferico')
export class PerifericoController {
  constructor(private readonly perifService: PerifericoService) {}

  @Post('create')
  create(@Body() body: { nome: string }) {
    return this.perifService.create(body.nome);
  }

  @Get(':nome')
  findOne(@Param('nome') nome: string) {
    return this.perifService.findOne(nome);
  }

  @Patch(':nome')
  update(
    @Param('nome') nomeAntigo: string,
    @Body() body: { nomeNovo: string },
  ) {
    return this.perifService.update(nomeAntigo, body.nomeNovo);
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
