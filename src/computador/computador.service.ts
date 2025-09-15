import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Computador } from './entities/computador.entity';
import { Periferico } from 'src/periferico/entities/periferico.entitiy';

@Injectable()
export class ComputadorService {
  constructor(
    @InjectRepository(Computador)
    private computadorRepo: Repository<Computador>,

    @InjectRepository(Periferico)
    private perifericoRepo: Repository<Periferico>,
  ) {}

  create(nome: string, cor: string, dataDeFabricacao: number) {
    const char = this.computadorRepo.create({
      nome: nome,
      cor: cor,
      dataDeFabricacao: dataDeFabricacao,
    });
    return this.computadorRepo.save(char);
  }

  delete(nome: string) {
    return this.computadorRepo.delete(nome);
  }

  async update(nome: string, data: any) {
    await this.computadorRepo.update(nome, {
      nome: data.nome,
      cor: data.cor,
      dataDeFabricacao: data.dataDeFabricacao,
    });
    return this.findOne(nome);
  }

  findOne(nome: string): Promise<Computador | null> {
    return this.computadorRepo.findOne({ where: { nome } });
  }

  findAll(): Promise<Computador[]> {
    return this.computadorRepo.find();
  }

  async addPeriferico(nome: string, perifericoNome: string) {
    const computador = await this.findOne(nome);
    if (!computador) {
      throw new Error('Computador não encontrado');
    }

    const jaExiste = computador.perifericos?.some(
      (p) => p.nome === perifericoNome,
    );
    if (jaExiste) {
      throw new Error('Periférico já adicionado');
    }

    const periferico = this.perifericoRepo.create({
      nome: perifericoNome,
      computador,
    });

    await this.perifericoRepo.save(periferico);
    return this.findOne(nome);
  }

  async removePeriferico(nome: string, periferico: string) {
    const computador = await this.findOne(nome);
    if (!computador) {
      throw new Error('Computador nao encontrado');
    }
    if (!computador.perifericos) {
      computador.perifericos = [];
    }
    computador.perifericos = computador.perifericos.filter(
      (p) => p.nome !== periferico,
    );
    return this.computadorRepo.save(computador);
  }
}
