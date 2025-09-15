import { Computador } from "src/computador/entities/computador.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Periferico {
    @PrimaryColumn()
    nome:string;

    @ManyToOne(() => Computador, (computador) => computador.perifericos )
    computador: Computador;
}