module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/games.db3'
    },
    migrations: {
      directory: 'data/migrations'
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    migrations: {
      directory: 'data/migrations',
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'data/migrations',
    },
  }

};
