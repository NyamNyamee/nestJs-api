import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach일 때는 매 테스트마다 app을 새로 생성해서 메모리가 초기화되므로 beforeAll로 바꿈
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // // 유효성검증 어노테이션이 안붙은 프로퍼티만 제외해버림
        forbidNonWhitelisted: true, // 유효성검증 어노테이션이 안붙은 프로퍼티가 있으면 400에러 던짐
        transform: true, // 요청받은 파라미터를 컨트롤러에 적은 파라미터 타입으로 변환해줌
      }),
    );
    await app.init();
  });

  it('/', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to movie API');
  });

  describe('/movies', () => {
    it('GET all', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Matrix', year: 1999, genres: ['Action', 'SF'] })
        .expect(201);
    });

    it('POST bad request', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Matrix', year: 1999, genres: ['Action', 'SF', 123] })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET id 1', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
        .expect({
          id: 1,
          title: 'Matrix',
          year: 1999,
          genres: ['Action', 'SF'],
        });
    });

    it('PATCH id 1', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Matrix2', year: 2003 })
        .expect(200);
    });

    it('DELETE id 1', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
