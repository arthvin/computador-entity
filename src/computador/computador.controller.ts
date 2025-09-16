import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { ComputadorService } from './computador.service';

@Controller('computador')
export class ComputadorController {
  constructor(private readonly computadorService: ComputadorService) {}

  @Post('create')
  create(
    @Body() body: { nome: string; cor: string; dataDeFabricacao: number },
  ) {
    return this.computadorService.create(
      body.nome,
      body.cor,
      body.dataDeFabricacao,
    );
  }

  @Get(':nome')
  findOne(@Param('nome') nome: string) {
    return this.computadorService.findOne(nome);
  }

  @Patch(':nome')
  update(@Param('nome') nome: string, @Body() data: any) {
    return this.computadorService.update(nome, data);
  }

  @Delete(':nome')
  remove(@Param('nome') nome: string) {
    return this.computadorService.delete(nome);
  }

  @Get()
  findAll() {
    return this.computadorService.findAll();
  }

  @Post(':nome/periferico')
  addPeriferico(
    @Param('nome') nome: string,
    @Body() body: { perifericoNome: string },
  ) {
    return this.computadorService.addPeriferico(nome, body.perifericoNome);
  }

  @Delete(':nome/periferico/:perifericoNome')
  removePeriferico(
    @Param('nome') nome: string,
    @Param('perifericoNome') perifericoNome: string,
  ) {
    return this.computadorService.removePeriferico(nome, perifericoNome);
  }
}
