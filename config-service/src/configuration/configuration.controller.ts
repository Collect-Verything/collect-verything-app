import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { configEnv } from '../../env-config';

@Controller(`${configEnv.CONFIG_URL}/conf`)
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Post(':sub_stripe_id')
  assignConfigToSub(
    @Param('sub_stripe_id') sub_stripe_id: string,
    @Body() createConfigurationDto: CreateConfigurationDto
  ) {
    return this.configurationService.create(sub_stripe_id, createConfigurationDto);
  }

  @Get()
  findAll() {
    return this.configurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configurationService.findOne(+id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.configurationService.deleteOne(+id);
  }
}
