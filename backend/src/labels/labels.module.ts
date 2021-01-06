import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './labels.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Label])
  ],
  providers: [LabelsService],
  exports: [LabelsService],
  controllers: [LabelsController]
})
export class LabelsModule {}
