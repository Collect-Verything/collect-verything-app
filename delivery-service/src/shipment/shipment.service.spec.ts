import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentService } from './shipment.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ShipmentService', () => {
  let service: ShipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentService, PrismaService],
    }).compile();

    service = module.get<ShipmentService>(ShipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
