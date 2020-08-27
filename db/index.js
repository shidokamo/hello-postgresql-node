import { logger } from '../logger'
import { Pool } from 'pg'
const pool = new Pool()

// If you just need single query, use this function.
const query = (text, params, callback) => {
  const start = Date.now()
  return pool.query(text, params, (err, res) => {
    const duration = Date.now() - start
    logger.debug('executed query', { text, duration, rows: res.rowCount })
    callback(err, res)
  })
};

const getClient = (callback) => {
  pool.connect((err, client, done) => {
    const start = Date.now()
    const query = client.query
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args
      logger.debug('execute query', { args })
      return query.apply(client, args)
    }
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      logger.error('A client has been checked out for more than 5 seconds!')
      logger.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000)
    const release = (err) => {
      // call the actual 'done' method, returning this client to the pool
      done(err)
      // clear our timeout
      clearTimeout(timeout)
      // set the query method back to its old un-monkey-patched version
      client.query = query
      const duration = Date.now() - start
      logger.debug('Returned client', { duration })
    }
    callback(err, client, release)
  })
};

export { query, getClient };
