import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ----------
  //  CUSTOMER
  // ----------
  @Post('create-customer')
  async customerCreate(@Body() cleanedRegisterForm: User) {
    return this.appService.createStripeCustomer(cleanedRegisterForm);
  }

  // ----------
  //  SESSION BASKET
  // ----------
  @Post('create-session/:id_stripe')
  async sessionCreate(
    @Param('id_stripe') id_stripe: string,
    @Body() basket: any,
  ) {
    return this.appService.createStripeSession(id_stripe, basket);
  }

  // ----------
  //  EVENT
  // ----------

  /*
   * - Dans un terminal:
   *     stripe login
   *     stripe listen --forward-to localhost:3003/event
   *
   * - Dans un autre:
   *     stripe trigger payment_intent.succeeded
   *
   * - Sinon copier coller les events de stripe et tester avec POSTMAN
   */

  @Post('event')
  async eventGet(@Body() eventObject: any) {
    console.log(eventObject);
  }
}
