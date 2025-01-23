import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/stripe.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/*
* Les fichier app. concernant le service est controller permettent de tester avant de creer des ressources
* */

@Module({
  imports: [StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
