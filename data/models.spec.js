const db = require('./db.config');
const model = require('./models');

describe('models', () => {
  beforeAll(() => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  beforeEach(async () => {
    await db('games').truncate();
  });

  describe('get()', () => {
    it('should get all data if an id is not provided', async () => {
      await model.add({
        title: 'a',
        genre: 'a',
      });

      await model.add({
        title: 'b',
        genre: 'b',
      });

      const data = await model.get();
      expect(data.length).toBe(2);
    });

    it('should get single person if an id is provided', async () => {
      await model.add({
        title: 'a',
        genre: 'a',
      });

      await model.add({
        title: 'b',
        genre: 'b',
        releaseYear: 'b',
      });

      const data = await model.get(2);
      expect(data.title).toBe('b');
      expect(data.genre).toBe('b');
      expect(data.releaseYear).toBe('b');
    });
  });

  describe('add()', () => {
    it('should insert the provided data', async () => {
      let data = await model.add({
        title: 'a',
        genre: 'a',
      });

      expect(data.title).toBe('a');
      expect(data.genre).toBe('a');
    });
  });

  describe('update()', () => {
    it('should update an existing record with the provided id and data', async () => {
      await model.add({
        title: 'a',
        genre: 'a',
      });

      let data = await model.update(1, {
        genre: 'b',
      });

      expect(data.title).toBe('a');
      expect(data.genre).toBe('b');
    });
  });

  describe('remove()', () => {
    it('should remove an existing record with the provided id', async () => {
      await model.add({
        title: 'a',
        genre: 'a',
      });

      let data = await model.remove(1);
      expect(data.title).toBe('a');
      expect(data.genre).toBe('a');
    })
  });
});
