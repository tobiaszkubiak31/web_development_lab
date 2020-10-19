import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers/customers.service';
import { Customer } from './customers/customers.entity';

@Controller()
export class AppController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getHello() {
    // console.log(this.customersService.findAll());
    // this.customersService.findAll().then(
    //   function(value) {
    //     return this.customersService.findAll().then();
    //   },
    //   function(value) {
    //     return 'missed';
    //   },
    // );
    console.log(await this.customersService.findAll());
    return await this.customersService.findAll();
  }
}
