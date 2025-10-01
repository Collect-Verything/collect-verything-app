import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

@Controller('ping')
class PingController {
  @Get()
  ping() {
    return { ok: true };
  }
}

describe('CORS – permissif', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      controllers: [PingController],
    }).compile();

    app = mod.createNestApplication();

    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    });

    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('renvoie Access-Control-Allow-Origin: * pour n’importe quelle Origin', async () => {
    const res = await request(app.getHttpServer())
      .get('/ping')
      .set('Origin', 'https://evil.example.com')
      .expect(200);

    expect(res.headers['access-control-allow-origin']).toBe('*');
  });

  it('pré-requête (OPTIONS) → expose les méthodes autorisées', async () => {
    const res = await request(app.getHttpServer())
      .options('/ping')
      .set('Origin', 'https://foo.bar')
      .set('Access-Control-Request-Method', 'POST')
      .expect(204);

    const allow = (res.headers['access-control-allow-methods'] || '').toUpperCase();
    expect(allow).toContain('GET');
    expect(allow).toContain('POST');
    expect(allow).toContain('PATCH');
    expect(allow).toContain('DELETE');
  });
});
