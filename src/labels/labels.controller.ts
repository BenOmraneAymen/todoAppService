import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { labelDto } from './dto/label.dto';
import { LabelsService } from './labels.service';
import { Label } from './schema/label.schema';

@ApiTags('Label')
@Controller('label')
export class LabelsController {
    constructor (private readonly labelService:LabelsService){

    }
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: Label,
      })

    @Get('userId=:id')
    findAll(@Param('id') id:string ){
        return this.labelService.findAll(id);
    }

    @Get('labelId=:id')
    findById(@Param('id') id:string ){
        return this.labelService.findById(id);
    }

    @Post()
    create(@Body() data:labelDto ){
        return this.labelService.create(data);
    }

    @Put('labelId=:id')
    put(@Param('id') id:string, @Body() data:labelDto ){
        return this.labelService.put(id,data);
    }

    @Delete('labelId=:id')
    delete(@Param('id') id:string){
        return this.labelService.delete(id)
    }

}
