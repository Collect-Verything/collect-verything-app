import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        UsersService,
        {
          provide: 'MAIL_SERVICE',
          useValue: {
            emit: jest.fn(),
            send: jest.fn(),
          } as Partial<ClientProxy>,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('UsersService.findAll (unit)', () => {
  let service: UsersService;

  const usersMock = [
    { id: 1, email: 'u1@example.com', roleId: 2, role: { id: 2, name: 'USER' } },
    { id: 2, email: 'u2@example.com', roleId: 2, role: { id: 2, name: 'USER' } },
  ];

  const prismaMock = {
    user: {
      findMany: jest.fn().mockResolvedValue(usersMock),
    },
  } as unknown as PrismaService;

  const mailClientMock: Partial<ClientProxy> = {
    emit: jest.fn(),
    send: jest.fn(),
  };

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: 'MAIL_SERVICE', useValue: mailClientMock },
      ],
    }).compile();

    service = mod.get(UsersService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('appelle prisma.user.findMany avec roleId: 2 et include.role = true', async () => {
    const res = await service.findAll();

    expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      where: { roleId: 1 },
      include: { role: true },
    });

    expect(res).toEqual(usersMock);
    expect(res.every((u) => u.roleId === 2)).toBe(true);
  });
});

describe('CreateUserDto validation', () => {
  it('refuse un email invalide et un firstname trop court', async () => {
    const badPayload = {
      id_stripe: 'cus_1',
      firstname: 'J',
      lastname: 'Doe',
      email: 'not-an-email',
      password: '12345',
      birthDate: 'not-a-date',
      gender: '',
      phone: '',
      roleId: null,
    };

    const dto = plainToInstance(CreateUserDto, badPayload);
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);

    const propsWithErrors = errors.map((e) => e.property);
    expect(propsWithErrors).toEqual(
      expect.arrayContaining([
        'firstname',
        'email',
        'password',
        'birthDate',
        'gender',
        'phone',
        'roleId',
      ])
    );
  });

  it('accepte un payload valide', async () => {
    const okPayload = {
      id_stripe: 'cus_1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@doe.com',
      password: 'secret123',
      birthDate: '2000-01-01',
      gender: 'M',
      phone: '0600000000',
      roleId: 2,
    };

    const dto = plainToInstance(CreateUserDto, okPayload);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
