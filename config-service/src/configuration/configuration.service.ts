import { Injectable } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConfigurationService {
  constructor(private prisma: PrismaService) {}

  create(
    sub_stripe_id: string,
    createConfigurationDto: CreateConfigurationDto,
  ) {
    return this.prisma.configuration.create({
      data: {
        ...createConfigurationDto,
        subscriptionId: Number(sub_stripe_id),
      },
    });
  }

  findAll() {
    return this.prisma.configuration.findMany();
  }

  findOne(id: number) {
    return this.prisma.configuration.findUnique({ where: { id: id } });
  }
}
