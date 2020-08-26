import { logger } from './logger';
import db from './db';

logger.info("Sent Select * query");
db.query('SELECT * from id_and_texts WHERE id = $1', [2], (err, res) => {
  if (err) {
    logger.error("Error!");
    logger.error(err);
    return;
  }
  logger.info("Data" + res.rows[0])
});
