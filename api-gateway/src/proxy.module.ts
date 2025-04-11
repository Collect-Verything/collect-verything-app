import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { HttpModule } from '@nestjs/axios';
import { ProxyController } from './proxy.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
