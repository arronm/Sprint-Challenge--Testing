const validateBody = keys => async (req, res, next) => {
  let response = await new Promise((resolve) => {
    Object.keys(keys).forEach(async (key) => {
      if (keys[key].required && !req.body[key]) {
        resolve({
          message: `Missing required field (${key})`,
        });
      }

      if (keys[key].type && req.body[key] && !(typeof req.body[key] === keys[key].type)) {
        resolve({
          message: `Expected type for (${key}) to be ${keys[key].type}, but instead saw ${typeof req.body[key]}`,
        });
      }
      
      if (keys[key].exists) {
        const { database: db, table, column } = keys[key].exists;
        const resource = await db(table).cb(db => {
          return db(table)
          .where(column, req.body[key])
        });

        if (!resource.length) {
          resolve({
            message: `Provided ${key} does not exist, please provide a valid ${key}`,
          });
        }
      }
    });
    resolve(null);
  });

  if (response) return res.status(422).json(response);
  next();
}

module.exports = validateBody;
