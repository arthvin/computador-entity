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

  async create(nome: string, cor: string, dataDeFabricacao: number) {
    const comp = this.computadorRepo.create({ nome, cor, dataDeFabricacao });
    return this.computadorRepo.save(comp);
  }

  async delete(nome: string) {
    return this.computadorRepo.delete(nome);
  }

  async update(nome: string, data: Partial<Computador>) {
    await this.computadorRepo.update(nome, data);
    return this.findOne(nome);
  }

  async findOne(nome: string): Promise<Computador | null> {
    return this.computadorRepo.findOne({
      where: { nome },
      relations: ['perifericos'], 
    });
  }

  async findAll(): Promise<Computador[]> {
    return this.computadorRepo.find({ relations: ['perifericos'] });
  }

  async addPeriferico(computadorNome: string, perifericoNome: string) {
    const computador = await this.findOne(computadorNome);
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
    return this.findOne(computadorNome);
  }

  async removePeriferico(computadorNome: string, perifericoNome: string) {
    const periferico = await this.perifericoRepo.findOne({
      where: { nome: perifericoNome, computador: { nome: computadorNome } },
      relations: ['computador'],
    });

    if (!periferico) {
      throw new Error('Periférico não encontrado');
    }

    await this.perifericoRepo.remove(periferico);

    return this.findOne(computadorNome);
  }
}
