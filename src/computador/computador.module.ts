import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computador } from './entities/computador.entity';
import { ComputadorService } from './computador.service';
import { ComputadorController } from './computador.controller';
import { Periferico } from 'src/periferico/entities/periferico.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Computador, Periferico])],
  providers: [ComputadorService],
  controllers: [ComputadorController],
})
export class ComputadorModule {}
