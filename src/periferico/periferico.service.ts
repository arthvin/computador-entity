import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Periferico } from './entities/periferico.entitiy';

@Injectable()
export class PerifericoService {
  constructor(
    @InjectRepository(Periferico)
    private readonly perifericoRepo: Repository<Periferico>,
  ) {}

  async create(nome: string) {
    const perif = this.perifericoRepo.create({ nome });
    return this.perifericoRepo.save(perif);
  }

  async delete(nome: string) {
    return this.perifericoRepo.delete(nome);
  }

  async update(nomeAntigo: string, nomeNovo: string) {
    await this.perifericoRepo.update(nomeAntigo, { nome: nomeNovo });
    return this.findOne(nomeNovo);
  }

  findOne(nome: string): Promise<Periferico | null> {
    return this.perifericoRepo.findOne({ where: { nome } });
  }

  findAll(): Promise<Periferico[]> {
    return this.perifericoRepo.find();
  }
}
