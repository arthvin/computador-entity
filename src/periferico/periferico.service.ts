import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Periferico } from './entities/periferico.entitiy';

@Injectable()
export class PerifericoService {
  constructor(
    @InjectRepository(Periferico) private perifericoRepo: Repository<Periferico>,
  ) {}

  create(nome: string) {
    const char = this.perifericoRepo.create({nome: nome});
    return this.perifericoRepo.save(char);
  }

  delete(nome: string) {
    return this.perifericoRepo.delete(nome)
  }

  async update(nome: string, data: string) {
    await this.perifericoRepo.update(nome, {nome: data});
    return this.findOne(nome);
  }

  findOne(nome: string ): Promise<Periferico | null> {
    return this.perifericoRepo.findOne({ where: { nome } });
  }

  findAll(): Promise<Periferico[]>{
    return this.perifericoRepo.find();
  }
}
