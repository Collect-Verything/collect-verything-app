import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from './configuration.service';
import {PrismaService} from "../prisma/prisma.service";

describe('ConfigurationService', () => {
  let service: ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationService,PrismaService],
    }).compile();

    service = module.get<ConfigurationService>(ConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
