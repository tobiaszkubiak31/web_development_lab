import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

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
  }
}
