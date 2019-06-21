const supertest = require('supertest');

const db = require('./data/db.config');
const server = require('./server.js');

describe('server', () => {
  beforeAll(() => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  beforeEach(async () => {
    await db('games').truncate();
  });

  describe('GET /', () => {
    it('should respond with a status of 200 OK', async () => {
      await supertest(server)
        .get('/')
        .expect(200);
    });

    it('response with json content', async () => {
      const res = await supertest(server)
        .get('/');
      expect(res.body).toEqual({ message: "API is running, better go catch it!" });
    });
  });

  describe('GET /games', () => {
    it('should respond with 200 OK', async () => {
      await supertest(server)
        .get('/games')
        .expect(200);
    });

    it('should respond with json content', async () => {
      await supertest(server)
        .get('/games')
        .expect('Content-Type', /json/i);
    });

    it('should respond with an empty object', async () => {
      const request = await supertest(server)
        .get('/games')
        .expect(200);
      expect(request.body.length).toBe(0);
    });
  })
});
