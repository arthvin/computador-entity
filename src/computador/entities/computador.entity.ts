import { Periferico } from 'src/periferico/entities/periferico.entitiy';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Computador {
  @PrimaryColumn()
  nome: string;

  @Column()
  cor: string;

  @Column()
  dataDeFabricacao: number;

  @OneToMany(() => Periferico, (periferico) => periferico.computador, { cascade: true , eager: true, })
  perifericos: Periferico[];
}
