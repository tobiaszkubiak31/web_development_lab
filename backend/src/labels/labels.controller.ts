import { Controller, Post, Request } from '@nestjs/common';
import { LabelsService } from './labels.service';

@Controller('labels')
export class LabelsController {
    constructor(
        private labelsService: LabelsService
    ) {}

    /*
    {
        "name": "name of label"
        "color": "color of label",
    }
    */
    @Post('add')
    async create(@Request() req) {
        return await this.labelsService.create(req.body);
    }

}
