import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { LabelSchema } from './schema/label.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:'Label',schema:LabelSchema}])],
  controllers:[LabelsController],
  providers: [LabelsService],
  
})
export class LabelsModule {}
