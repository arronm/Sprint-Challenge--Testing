const db = require('./db.config');

const get = id => {
  if (!id) return db('games');
  return db('games').where({ id }).first();
}

const add = (data) => {
  return db('games')
    .insert(data)
    .then(ids => {
      return get(ids[0]);
  });
}

const update = (id, data) => {
  return db('games')
    .where({ id })
    .update(data)
    .then(() => {
      return get(id);
  });
};

const remove = async (id) => {
  const record = await get(id);
  await db('games')
    .where({ id })
    .del();
  return record;
};

module.exports = ({
  add,
  get,
  update,
  remove,
});
