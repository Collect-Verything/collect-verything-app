import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController.register – validation DTO', () => {
  let app: INestApplication;

  const authServiceMock: Pick<AuthService, 'register'> = {
    register: jest.fn().mockResolvedValue({ id: 1, email: 'john@doe.com' }),
  };

  const jwtServiceMock: Partial<JwtService> = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
    decode: jest.fn(),
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    app = mod.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })
    );
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  beforeEach(() => jest.clearAllMocks());

  const url = '/auth/register';

  it('400 si email invalide (le service n’est pas appelé)', async () => {
    const bad = {
      id_stripe: 'cus_1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'not-an-email',
      password: '123456',
      birthDate: '2000-01-01',
      gender: 'M',
      phone: '0600000000',
      roleId: 99,
    };

    await request(app.getHttpServer()).post(url).send(bad).expect(400);

    expect(authServiceMock.register).not.toHaveBeenCalled();
  });

  it('201 si payload valide (le service est appelé)', async () => {
    const ok = {
      id_stripe: 'cus_1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@doe.com',
      password: '123456',
      birthDate: '2000-01-01',
      gender: 'M',
      phone: '0600000000',
      roleId: 99,
    };

    const res = await request(app.getHttpServer()).post(url).send(ok).expect(201);

    expect(authServiceMock.register).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({ id: 1, email: 'john@doe.com' });
  });
});
