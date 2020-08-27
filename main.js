import { logger } from './logger';
import { query } from './db';

logger.info("Sent Select * query");
query('SELECT * from id_and_texts WHERE id = $1', [2], (err, res) => {
  if (err) {
    logger.error("Error!");
    logger.error(err);
    return;
  }
  logger.info("Data")
  logger.info(JSON.stringify(res.rows[0]))
});
