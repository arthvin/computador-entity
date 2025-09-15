import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periferico } from './entities/periferico.entitiy';
import { PerifericoController } from './periferico.controller';
import { PerifericoService } from './periferico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Periferico])],
  providers: [PerifericoService],
  controllers: [PerifericoController],
})
export class PerifericoModule {}
