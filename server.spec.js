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
  });

  describe('POST /games', () => {
    const endpoint = '/games';
    it('should correctly insert a new user with status 201', async () => {
      const game = {
        title: 'Cyberpunk 2077',
        genre: 'action',
        releaseYear: 2077
      };

      let request = await supertest(server)
        .post(endpoint)
        .send(game)
        .expect(201);
      expect(request.body).toEqual({
        ...game,
        id: 1,
      });

      request = await supertest(server)
        .get(endpoint)
        .expect(200);
      expect(request.body.length).toBe(1);
    });

    it('should correctly handle missing genre with status 400', async () => {
      const request = await supertest(server)
        .post(endpoint)
        .send({ title: 'b' })
        .expect(400);
      expect(request.body).toEqual({ message: "Missing required field (genre)" });
    });

    it('should correctly handle missing title with status 400', async () => {
      const request = await supertest(server)
        .post(endpoint)
        .send({ genre: 'b' })
        .expect(400);
      expect(request.body).toEqual({ message: "Missing required field (title)" });
    });

    it('should correctly handle wrong `genre` type with status 400', async () => {
      const request = await supertest(server)
        .post(endpoint)
        .send({
          title: 'b',
          genre: 1,
        })
        .expect(400);
        expect(request.body).toEqual({ message: "Expected type for (genre) to be string, but instead saw number" });
    });

    it('should correctly handle wrong `title` type with status 400', async () => {
      const request = await supertest(server)
        .post(endpoint)
        .send({
          title: 1,
          genre: 'a',
        })
        .expect(400);
        expect(request.body).toEqual({ message: "Expected type for (title) to be string, but instead saw number" });
    });
  });
});
