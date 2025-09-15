import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computador } from './entities/computador.entity';
import { ComputadorService } from './computador.service';
import { ComputadorController } from './computador.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Computador])],
  providers: [ComputadorService],
  controllers: [ComputadorController],
})
export class ComputadorModule {}
