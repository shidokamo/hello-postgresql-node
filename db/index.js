import { logger } from '../logger'
import { Pool } from 'pg'
const pool = new Pool()

const query = (text, params, callback) => {
  const start = Date.now()
  return pool.query(text, params, (err, res) => {
     const duration = Date.now() - start
     logger.debug('executed query', { text, duration, rows: res.rowCount })
      callback(err, res)
  })
};

export { query };
