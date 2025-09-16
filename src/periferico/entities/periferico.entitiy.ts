import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Computador } from '../../computador/entities/computador.entity';

@Entity()
export class Periferico {
  @PrimaryColumn()
  nome: string;

  @ManyToOne(() => Computador, (computador) => computador.perifericos, {
    onDelete: 'CASCADE',
  })
  computador: Computador;
}