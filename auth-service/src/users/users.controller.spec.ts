import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientProxy } from '@nestjs/microservices';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [UsersController],
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

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SuperAdminGuards } from '../auth/guards/super-admin';

const mockJwtDecode = jest.fn();
jest.mock('jwt-decode', () => ({
  jwtDecode: (token: string) => mockJwtDecode(token),
}));

describe('UsersController + SuperAdminGuards (e2e)', () => {
  let app: INestApplication;
  const users = [
    { id: 1, email: 'admin@example.com', role: 'SUPER_ADMIN' },
    { id: 2, email: 'user@example.com', role: 'USER' },
  ];

  const usersServiceMock = {
    findAll: jest.fn().mockResolvedValue(users),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [SuperAdminGuards, { provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const url = '/users';

  it('GET /users → 200 quand le rôle est SUPER_ADMIN', async () => {
    mockJwtDecode.mockReturnValueOnce({ id: 123, role: 'SUPER_ADMIN' });

    const res = await request(app.getHttpServer())
      .get(url)
      .set('Authorization', 'Bearer any.valid.token')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(usersServiceMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('GET /users → 403 quand le rôle est USER', async () => {
    mockJwtDecode.mockReturnValueOnce({ id: 234, role: 'USER' });

    await request(app.getHttpServer())
      .get(url)
      .set('Authorization', 'Bearer any.token')
      .expect(403);

    expect(usersServiceMock.findAll).not.toHaveBeenCalled();
  });

  it('GET /users → 403 sans Authorization', async () => {
    await request(app.getHttpServer()).get(url).expect(403);
    expect(usersServiceMock.findAll).not.toHaveBeenCalled();
  });
});

describe('JWT security – invalid/expired (e2e)', () => {
  let app: INestApplication;

  const usersServiceMock = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, email: 'a@b.c', role: 'SUPER_ADMIN' }]),
  };

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [SuperAdminGuards, { provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    app = mod.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const url = '/users';

  it('refuse un token INVALIDE (jwtDecode jette)', async () => {
    mockJwtDecode.mockImplementationOnce(() => {
      throw new Error('bad token');
    });

    await request(app.getHttpServer())
      .get(url)
      .set('Authorization', 'Bearer invalid.token')
      .expect(500);
  });

  it('montre que les TOKENS EXPIRÉS passent aujourd’hui (anomalie)', async () => {
    const past = Math.floor(Date.now() / 1000) - 3600; // exp il y a 1h
    mockJwtDecode.mockReturnValueOnce({ id: 123, role: 'SUPER_ADMIN', exp: past });

    await request(app.getHttpServer())
      .get(url)
      .set('Authorization', 'Bearer expired.token')
      .expect(200);
  });
});
